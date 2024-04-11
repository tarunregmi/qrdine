/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yzb452oqr5pbd23")

  // remove
  collection.schema.removeField("ly1ngpvh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kqwbtdbk",
    "name": "table",
    "type": "relation",
    "required": true,
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yzb452oqr5pbd23")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ly1ngpvh",
    "name": "menuItems",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "77xcsjact3mauo8",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  // remove
  collection.schema.removeField("kqwbtdbk")

  return dao.saveCollection(collection)
})
