/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ulfwqb6ek030atf")

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ulfwqb6ek030atf")

  // remove
  collection.schema.removeField("bvgrnwsw")

  return dao.saveCollection(collection)
})
