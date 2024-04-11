/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3k3iut5fw09mika")

  collection.name = "orders"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3k3iut5fw09mika")

  collection.name = "order"

  return dao.saveCollection(collection)
})
