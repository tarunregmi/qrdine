/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "3k3iut5fw09mika",
    "created": "2024-03-09 02:23:35.788Z",
    "updated": "2024-03-09 02:23:35.788Z",
    "name": "order",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "nyoh3von",
        "name": "title",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "77xcsjact3mauo8",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("3k3iut5fw09mika");

  return dao.deleteCollection(collection);
})
