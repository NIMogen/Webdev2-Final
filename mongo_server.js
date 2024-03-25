// To connect with your mongoDB database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/', {
    dbName: 'final',
    useNewUrlParser: true,
    useUnifiedTopology: true
});
 
// Schema for users of app
const SaveSchema = new mongoose.Schema({
    playerX: Number,
    playerY: Number,
});
const SaveState = mongoose.model('savestate', SaveSchema);
SaveState.createIndexes();
 
// For backend and express
const express = require('express');
const app = express();
const cors = require("cors");
console.log("App listen at port 5000");
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
    res.send("App is Working");
});
 
app.post("/save", async (req, res) => {
    console.log("Sending game data to database");
    try {
        const savesate = new SaveState();
        await SaveState.updateMany(
            {}, 
            {$set: {playerX: req.body.playerX, playerY: req.body.playerY}}, 
            {upsert: true}
        );

        let result = await savestate.save();
        result = result.toObject();
        if (result) {
            console.log(result);
        } else {
            console.log("Returned value of savestate invalid");
        }
 
    } catch (e) {
        res.send("Something went wrong when trying to save the state");
    }
});

app.get("/load", async (req, res) => {
    console.log("Loading game data from database");
    try {
        let savestate = await SaveState.find({}, 'playerX playerY');
        console.log(savestate);
        res.json({ playerX: savestate[0].playerX, playerY: savestate[0].playerY });
    } catch (e) {
        console.log("Could not load data from database");
    }
});

app.listen(5000);
