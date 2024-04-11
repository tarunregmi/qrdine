/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wskorha8s451s7o")

  // update
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wskorha8s451s7o")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4h2qq7nw",
    "name": "delivery_address",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  return dao.saveCollection(collection)
})
