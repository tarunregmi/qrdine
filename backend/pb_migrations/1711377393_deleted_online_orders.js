/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("s3reikj1ompiiwf");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "s3reikj1ompiiwf",
    "created": "2024-03-25 13:50:23.573Z",
    "updated": "2024-03-25 13:50:23.573Z",
    "name": "online_orders",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "4pe5hhl5",
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
        "id": "zryghmwm",
        "name": "address",
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
        "id": "fhk5ty2s",
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
        "id": "2jss6c9x",
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
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
