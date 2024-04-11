/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("3k3iut5fw09mika");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "3k3iut5fw09mika",
    "created": "2024-03-09 02:23:35.788Z",
    "updated": "2024-03-09 03:09:42.979Z",
    "name": "orders",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "nyoh3von",
        "name": "menuItems",
        "type": "relation",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "77xcsjact3mauo8",
          "cascadeDelete": true,
          "minSelect": 0,
          "maxSelect": null,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "utmr4jdn",
        "name": "tableNumbers",
        "type": "relation",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "018wrv27nestd97",
          "cascadeDelete": true,
          "minSelect": 0,
          "maxSelect": null,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "4680feo8",
        "name": "username",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": true,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
    "listRule": "@request.auth.id != \"\"",
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
