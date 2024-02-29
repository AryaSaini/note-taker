const express = require('express');
const fs = require('fs');
// const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());
app.use(express.static('public'));


app.get('/notes', (req, res) => {
  res.sendFile(__dirname + '/notes.html');
});


app.get('*', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


app.get('/api/notes', (req, res) => {
  fs.readFile(__dirname + '/db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).end();
    }

    res.json(JSON.parse(data));
  });
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = uuidv4();

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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});