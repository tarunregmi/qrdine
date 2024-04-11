/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wskorha8s451s7o")

  // remove
  collection.schema.removeField("fyy7klcr")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4h2qq7nw",
    "name": "address",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wskorha8s451s7o")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fyy7klcr",
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
  }))

  // remove
  collection.schema.removeField("4h2qq7nw")

  return dao.saveCollection(collection)
})
