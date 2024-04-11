/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yzb452oqr5pbd23")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mkkg0u1z",
    "name": "items",
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
  const collection = dao.findCollectionByNameOrId("yzb452oqr5pbd23")

  // remove
  collection.schema.removeField("mkkg0u1z")

  return dao.saveCollection(collection)
})
