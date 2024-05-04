/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kze74mrvb0rzzz2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wxhhmeui",
    "name": "gender",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "male",
        "female"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kze74mrvb0rzzz2")

  // remove
  collection.schema.removeField("wxhhmeui")

  return dao.saveCollection(collection)
})
