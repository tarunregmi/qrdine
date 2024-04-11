/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("ulfwqb6ek030atf");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "ulfwqb6ek030atf",
    "created": "2024-03-28 11:05:01.634Z",
    "updated": "2024-03-28 11:54:24.246Z",
    "name": "local_orders_tmp",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "vg4pxq50",
        "name": "items",
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
      },
      {
        "system": false,
        "id": "bvgrnwsw",
        "name": "quantity",
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
        "id": "mcsagt9k",
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
        "id": "inholkra",
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
        "id": "jaqv2b1b",
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
