/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3k3iut5fw09mika")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "utmr4jdn",
    "name": "number",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "018wrv27nestd97",
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
    "id": "utmr4jdn",
    "name": "gopal",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "018wrv27nestd97",
      "cascadeDelete": true,
      "minSelect": 0,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
