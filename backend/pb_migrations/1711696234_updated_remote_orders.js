/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wskorha8s451s7o")

  // remove
  collection.schema.removeField("4h2qq7nw")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nloyavyy",
    "name": "deliveryAddress",
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wskorha8s451s7o")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4h2qq7nw",
    "name": "deliveryAddress",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  // remove
  collection.schema.removeField("nloyavyy")

  return dao.saveCollection(collection)
})
