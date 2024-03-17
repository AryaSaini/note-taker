const fs = require('fs')
const { v4 } = require('uuid')
const db = require('../db/db.json')
const router = require('express').Router()

router.get('/notes', (req, res) => {
    res.json(db)
});

router.post('/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = v4();

    fs.readFile(__dirname + '/db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).end();
        }

        const notes = JSON.parse(data);
        notes.push(newNote);

        fs.writeFile(__dirname + '/db/db.json', JSON.stringify(notes), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).end();
            }

            res.json(newNote);
        });
    });
});

module.exports = router