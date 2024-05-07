/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kze74mrvb0rzzz2")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tebe0fit",
    "name": "type",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "teacher",
        "student",
        "mentor"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kze74mrvb0rzzz2")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tebe0fit",
    "name": "type",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "teacher",
        "student"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
