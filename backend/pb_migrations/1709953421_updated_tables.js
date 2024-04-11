/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("018wrv27nestd97")

  // remove
  collection.schema.removeField("3ekdrdgx")

  // remove
  collection.schema.removeField("1xnw0chw")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "si2sxaod",
    "name": "tableNumber",
    "type": "text",
    "required": false,
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("018wrv27nestd97")

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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1xnw0chw",
    "name": "number",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  // remove
  collection.schema.removeField("si2sxaod")

  // remove
  collection.schema.removeField("vt7lk5jv")

  return dao.saveCollection(collection)
})
