/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("a0unmawpo4kmu7o");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "a0unmawpo4kmu7o",
    "created": "2024-03-25 13:44:30.326Z",
    "updated": "2024-03-25 13:44:30.326Z",
    "name": "remote_orders",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "xna72yfb",
        "name": "items",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 2000000
        }
      },
      {
        "system": false,
        "id": "9uv0kozn",
        "name": "table",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "018wrv27nestd97",
          "cascadeDelete": true,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "1h8hwyqb",
        "name": "state",
        "type": "select",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "pending",
            "confirmed",
            "completed",
            "cancelled"
          ]
        }
      },
      {
        "system": false,
        "id": "xr8tm5nt",
        "name": "username",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
