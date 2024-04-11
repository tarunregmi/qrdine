/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3k3iut5fw09mika")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nyoh3von",
    "name": "itemTitle",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "77xcsjact3mauo8",
      "cascadeDelete": true,
      "minSelect": 0,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3k3iut5fw09mika")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nyoh3von",
    "name": "title",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "77xcsjact3mauo8",
      "cascadeDelete": true,
      "minSelect": 0,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
