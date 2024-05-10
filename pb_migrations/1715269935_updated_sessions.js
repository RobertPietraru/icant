/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pgq3zli8by55eva")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4f8wqgdc",
    "name": "teacher_confirmed",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pgq3zli8by55eva")

  // remove
  collection.schema.removeField("4f8wqgdc")

  return dao.saveCollection(collection)
})
