/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6q2xahgunuc0tf0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "q1d73uj5",
    "name": "field",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "kze74mrvb0rzzz2",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6q2xahgunuc0tf0")

  // remove
  collection.schema.removeField("q1d73uj5")

  return dao.saveCollection(collection)
})
