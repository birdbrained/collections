from django.db.models import Q
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from serializers import CollectionSerializer, GroupSerializer, ItemSerializer
from models import Collection, Group, Item


@api_view(['GET'])
def api_root(request):
    return Response({
        'collections': reverse('collection-list', request=request),
        'items': reverse('item-list', request=request)
    })


class CollectionList(generics.ListCreateAPIView):
    """View list of collections and create a new collection. """
    serializer_class = CollectionSerializer

    def get_queryset(self):
        queryset = Collection.objects.all()
        title = self.request.query_params.get('title', None)
        if title is not None:
            queryset = queryset.filter(title__icontains=title)
        return queryset


class CollectionDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CollectionSerializer

    def get_object(self):
        return Collection.objects.get(id=self.kwargs['pk'])


class GroupList(generics.ListCreateAPIView):
    serializer_class = GroupSerializer

    def get_queryset(self):
        return Group.objects.filter(collection=self.kwargs['pk'])


class GroupDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = GroupSerializer

    def get_object(self):
        return Group.objects.get(id=self.kwargs['group_id'])


class GroupItemList(generics.ListCreateAPIView):
    """View items in a collection and create a new item to add to the collection. """
    serializer_class = ItemSerializer

    def get_queryset(self):
        user = self.request.user
        collection_id = self.kwargs['pk']
        collection = Collection.objects.get(id=collection_id)
        queryset = Item.objects.filter(group=self.kwargs['group_id'])
        if user.id == collection.created_by_id:
            return queryset
        return queryset.filter(Q(status='approved') | Q(created_by=user))


class ItemDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ItemSerializer

    def get_object(self):
        return Item.objects.get(id=self.kwargs['item_id'])


class CollectionItemList(generics.ListCreateAPIView):
    serializer_class = ItemSerializer

    def get_queryset(self):
        user = self.request.user
        collection_id = self.kwargs['pk']
        collection = Collection.objects.get(id=collection_id)
        queryset = Item.objects.filter(collection=collection_id, group=None)
        if user.id == collection.created_by_id:
            return queryset
        return queryset.filter(Q(status='approved') | Q(created_by=user))
