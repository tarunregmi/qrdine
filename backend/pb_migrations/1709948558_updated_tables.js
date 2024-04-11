/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("018wrv27nestd97")

  // remove
  collection.schema.removeField("sphqzxha")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vgu1ldu8",
    "name": "number",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": null,
      "noDecimal": true
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rttibn6f",
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
    "id": "sphqzxha",
    "name": "isAvailable",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("vgu1ldu8")

  // remove
  collection.schema.removeField("rttibn6f")

  return dao.saveCollection(collection)
})
