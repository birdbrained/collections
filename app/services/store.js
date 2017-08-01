


import Ember from 'ember';
import emberData from 'ember-data/-private';



const {
  _Backburner: Backburner,
  get,
} = Ember;

const {
    Store,
    InternalModel,
    RelationshipPayloads,
    RelationshipPayloadsManager,
} = emberData;



RelationshipPayloadsManager.prototype.push = function(modelName, id, relationshipsData) {

    debugger;

    if (!relationshipsData) return;

    let modelClass = this._store._modelFor(modelName);
    let relationshipsByName = get(modelClass, 'relationshipsByName');

    Object.keys(relationshipsData).forEach(key => {

        let relationshipPayloads = this._getRelationshipPayloads(modelName, key, modelClass, relationshipsByName, true);

        if (relationshipPayloads) {
            relationshipPayloads.push(modelName, id, key, relationshipsData[key]);
        }

    });

};


export default Store.extend({

    _load(data) {

        debugger;
        //heimdall.increment(_load);
        let internalModel = this._internalModelForId(data.type, data.id);

        internalModel.setupData(data);

        this.recordArrayManager.recordDidChange(internalModel);

        return internalModel;

    },

    _setupRelationshipsForModel(internalModel, data) {
        if (data.relationships === undefined) return;
        if (this._pushedInternalModels.push(internalModel, data) !== 2) return;
        this._backburner.schedule('normalizeRelationships', this, this._setupRelationships);
    },

    _setupRelationships() {
        let pushed = this._pushedInternalModels;
        //debugger;

        // Cache the inverse maps for each modelClass that we visit during this
        // payload push.  In the common case where we are pushing many more
        // instances than types we want to minimize the cost of looking up the
        // inverse map and the overhead of Ember.get adds up.
        let modelNameToInverseMap = Object.create(null);

        for (let i = 0, l = pushed.length; i < l; i += 2) {
            // This will convert relationships specified as IDs into DS.Model instances
            // (possibly unloaded) and also create the data structures used to track
            // relationships.
            let internalModel = pushed[i];
            let data = pushed[i + 1];
            setupRelationships(this, internalModel, data, modelNameToInverseMap);
        }

        pushed.length = 0;
    },

});

function isInverseRelationshipInitialized(store, internalModel, data, key, modelNameToInverseMap) {
  let relationshipData = data.relationships[key].data;

  if (!relationshipData) {
    // can't check inverse for eg { comments: { links: { related: URL }}}
    return false;
  }

  let inverseMap = modelNameToInverseMap[internalModel.modelName]
  if (!inverseMap) {
    inverseMap = modelNameToInverseMap[internalModel.modelName] = get(internalModel.type, 'inverseMap');
  }
  let inverseRelationshipMetadata = inverseMap[key];
  if (inverseRelationshipMetadata === undefined) {
    inverseRelationshipMetadata = internalModel.type.inverseFor(key, store);
  }

  if (!inverseRelationshipMetadata) {
    return false;
  }

  let { name: inverseRelationshipName } = inverseRelationshipMetadata;

  if (Array.isArray(relationshipData)) {
    for (let i=0; i<relationshipData.length; ++i) {
      let inverseInternalModel = store._internalModelsFor(relationshipData[i].type).get(relationshipData[i].id);
      if (inverseInternalModel && inverseInternalModel._relationships.has(inverseRelationshipName)) {
        return true;
      }
    }

    return false;
  } else {
    let inverseInternalModel = store._internalModelsFor(relationshipData.type).get(relationshipData.id);
    return inverseInternalModel && inverseInternalModel._relationships.has(inverseRelationshipName);
  }
}

function setupRelationships(store, internalModel, data, modelNameToInverseMap) {
    let relationships = internalModel._relationships;
    //debugger;

    internalModel.type.eachRelationship(relationshipName => {

        debugger;
        if (!data.relationships[relationshipName]) {
            return;
        }

        let relationshipRequiresNotification = relationships.has(relationshipName) ||
            isInverseRelationshipInitialized(store, internalModel, data, relationshipName, modelNameToInverseMap);

        if (relationshipRequiresNotification) {
            //debugger;
            let relationshipData = data.relationships[relationshipName];
            relationships.get(relationshipName).push(relationshipData);
        }

        // in debug, assert payload validity eagerly
        /*let relationshipMeta = get(internalModel.type, 'relationshipsByName').get(relationshipName);
        let relationshipData = data.relationships[relationshipName];
        if (!relationshipData || !relationshipMeta) return;
        if (relationshipData.links) {
            let isAsync = relationshipMeta.options && relationshipMeta.options.async !== false;
            warn(`You pushed a record of type '${internalModel.type.modelName}' with a relationship '${relationshipName}' configured as 'async: false'. You've included a link but no primary data, this may be an error in your payload.`, isAsync || relationshipData.data , {
              id: 'ds.store.push-link-for-sync-relationship'
            });
        } else if (relationshipData.data) {
            if (relationshipMeta.kind === 'belongsTo') {
                assert(`A ${internalModel.type.modelName} record was pushed into the store with the value of ${relationshipName} being ${inspect(relationshipData.data)}, but ${relationshipName} is a belongsTo relationship so the value must not be an array. You should probably check your data payload or serializer.`, !Array.isArray(relationshipData.data));
            } else if (relationshipMeta.kind === 'hasMany') {
                assert(`A ${internalModel.type.modelName} record was pushed into the store with the value of ${relationshipName} being '${inspect(relationshipData.data)}', but ${relationshipName} is a hasMany relationship so the value must be an array. You should probably check your data payload or serializer.`, Array.isArray(relationshipData.data));
            }
        }*/
    });
}

