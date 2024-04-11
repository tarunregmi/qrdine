/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wskorha8s451s7o")

  collection.name = "remote_orders"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wskorha8s451s7o")

  collection.name = "orders_duplicate"

  return dao.saveCollection(collection)
})
