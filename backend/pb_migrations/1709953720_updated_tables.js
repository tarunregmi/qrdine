/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("018wrv27nestd97")

  // remove
  collection.schema.removeField("si2sxaod")

  // remove
  collection.schema.removeField("vt7lk5jv")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wonj1t8r",
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
    "id": "utjqlsob",
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
    "id": "si2sxaod",
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
    "id": "vt7lk5jv",
    "name": "isAvailable",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("wonj1t8r")

  // remove
  collection.schema.removeField("utjqlsob")

  return dao.saveCollection(collection)
})
