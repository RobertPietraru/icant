/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kze74mrvb0rzzz2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "slua924k",
    "name": "phone",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kze74mrvb0rzzz2")

  // remove
  collection.schema.removeField("slua924k")

  return dao.saveCollection(collection)
})
