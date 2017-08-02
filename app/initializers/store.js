import Ember from 'ember';
import emberData from 'ember-data/-private';


const {
    RelationshipPayloadsManager,
} = emberData;

export function initialize() {
    RelationshipPayloadsManager.prototype._getRelationshipPayloads = function(modelName, relationshipName, modelClass, relationshipsByName, init) {
        if (!relationshipsByName.has(relationshipName)) return;
        if (relationshipsByName.get(relationshipName).kind === "hashMany") {
            debugger;
        }

        let key = `${modelName}:${relationshipName}`;
        if (!this._cache[key] && init) {
          return this._initializeRelationshipPayloads(modelName, relationshipName, modelClass, relationshipsByName);
        }

        return this._cache[key];
    }
};
