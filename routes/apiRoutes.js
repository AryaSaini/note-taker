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

    db.push(newNote);

    fs.writeFile('./db/db.json', JSON.stringify(db), (err) => {
        if (err) {
            console.error(err);
        }
        res.json('note has been added');
        return
    });
});

module.exports = router