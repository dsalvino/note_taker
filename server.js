const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

let notesData = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "Develop/public")));




app.get("/api/notes", (err, res) => {
    try {
        notesData = fs.readFileSync("Develop/db/db.json");
        console.log("Make a note!");
        notesData = JSON.parse(notesData);

    } catch (err) {
        console.log("\n error (in app.get.catch):");
        console.log(err);
    }
    res.json(notesData);
});



app.post("/api/notes", (req, res) => {
try {
    notesData = fs.readFileSync('./Develop/db/db.json');
    notesData = JSON.parse(notesData);
    req.body.id = notesData.length;
    notesData.push(req.body);
    notesData = JSON.stringify(notesData);
    fs.writeFile('./Develop/db/db.json', notesData, function(err) {
        if (err) throw err;
    });
    res.json(JSON.parse(notesData));
    console.log(notesData);
} catch (err) {
    throw err;
}
});

app.delete("/api/notes/:id", (req, res) => {
    try {
        notesData = fs.readFileSync("./Develop/db/db.json");
        notesData = JSON.parse(notesData);
        notesData = notesData.filter((note) => {
        return note.id != req.params.id;
        });
        notesData = JSON.stringify(notesData);
        fs.writeFile("./Develop/db/db.json", notesData, (err) => {
        if (err) throw err;
        });
        res.send(JSON.parse(notesData));
    } catch (err) {
        throw err;
    }
});


app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, "Develop/public/notes.html")));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, "Develop/public/index.html")));

app.get('/api/notes', (req, res) => res.sendFile(path.json(__dirname, "Develop/db/db.json")));

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));