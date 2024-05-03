/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kze74mrvb0rzzz2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bprng7ee",
    "name": "picture",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [],
      "thumbs": [],
      "maxSelect": 1,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kze74mrvb0rzzz2")

  // remove
  collection.schema.removeField("bprng7ee")

  return dao.saveCollection(collection)
})
