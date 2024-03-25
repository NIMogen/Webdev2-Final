// To connect with your mongoDB database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/', {
    dbName: 'final',
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => err ? console.log(err) : 
    console.log('Connected to final database'));
 
// Schema for users of app
const SaveSchema = new mongoose.Schema({
    playerX: {
        type: Number,
        required: true,
    },
    playerY: {
        type: Number,
        required: true,
    },
});
const SaveState = mongoose.model('savestate', UserSchema);
SaveState.createIndexes();
 
// For backend and express
const express = require('express');
const app = express();
const cors = require("cors");
console.log("App listen at port 5000");
app.use(express.json());
app.use(cors());
app.get("/", (req, resp) => {
    resp.send("App is Working");
});
 
app.post("/save", async (req, resp) => {
    try {
        const savesate = new SaveState(req.body);
        await SaveState.updateMany({}, { $set: { playerX: req.body.playerX, playerY: req.body.playerY } });
        let result = await savestate.save();
        result = result.toObject();
        if (result) {
            console.log(result);
        } else {
            console.log("Error occured when saving state");
        }
 
    } catch (e) {
        resp.send("Something Went Wrong");
    }
});

app.get("load", async (req, resp) => {
    let savestate = await SaveState.find({}, 'playerX playerY');
    res.send({ playerX: savestate.playerX, playerY: savestate.playerY });
});

app.listen(5000);
