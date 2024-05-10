/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pgq3zli8by55eva")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qy3phpl9",
    "name": "google_meet_link",
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
  const collection = dao.findCollectionByNameOrId("pgq3zli8by55eva")

  // remove
  collection.schema.removeField("qy3phpl9")

  return dao.saveCollection(collection)
})
