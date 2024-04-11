/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("018wrv27nestd97")

  // remove
  collection.schema.removeField("wonj1t8r")

  // remove
  collection.schema.removeField("utjqlsob")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lsizvd4h",
    "name": "tableName",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3ekdrdgx",
    "name": "isAvailable",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("018wrv27nestd97")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wonj1t8r",
    "name": "name",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "utjqlsob",
    "name": "isAvailable",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("lsizvd4h")

  // remove
  collection.schema.removeField("3ekdrdgx")

  return dao.saveCollection(collection)
})
