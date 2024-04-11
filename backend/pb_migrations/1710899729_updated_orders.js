/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yzb452oqr5pbd23")

  // remove
  collection.schema.removeField("hunrp8pq")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ha6t3j0f",
    "name": "user",
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yzb452oqr5pbd23")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hunrp8pq",
    "name": "tableNames",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "018wrv27nestd97",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  // remove
  collection.schema.removeField("ha6t3j0f")

  return dao.saveCollection(collection)
})
