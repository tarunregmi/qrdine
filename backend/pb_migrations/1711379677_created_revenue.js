/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "h3oudup4evidpdn",
    "created": "2024-03-25 15:14:37.520Z",
    "updated": "2024-03-25 15:14:37.520Z",
    "name": "revenue",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "1h2mc4y4",
        "name": "date",
        "type": "date",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "brt0ak0z",
        "name": "money",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
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
  const collection = dao.findCollectionByNameOrId("h3oudup4evidpdn");

  return dao.deleteCollection(collection);
})
