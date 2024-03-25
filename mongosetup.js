use final
db.createCollection(savestates)
db.savestates.insertOne({
    playerX: 0,
    playerY: 0,
})