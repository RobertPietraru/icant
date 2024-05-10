/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6q2xahgunuc0tf0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ogjkfoyq",
    "name": "subject",
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
  const collection = dao.findCollectionByNameOrId("6q2xahgunuc0tf0")

  // remove
  collection.schema.removeField("ogjkfoyq")

  return dao.saveCollection(collection)
})
