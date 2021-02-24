const express = require('express')
const fs = require('fs')

const app = express()

//set the port 
const PORT = process.env.PORT || 3000

const notes = JSON.parse (fs.readFileSync('./db/db.json', 'utf8'));

app.use( express.static('public') )
// accept incoming POST requests
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Data - get previous notes
app.get("/api/notes",function(req, res) {

    console.log( `getting previous notes.. ${notes} `)
    res.send(notes);
});

//create new notes 
app.post('/api/notes', function(req, res) {
    console.log( '[POST /api/notes]', req.body )
    const newNote = {
        id: uuid(),
        title: req.body.title,
        text: req.body.text,
    }
    console.log( `[notes] noteList(${notes.length} entries), adding: \n`, newNote)
    notes.push( newNote )
    // save to a file, as a string like localStorage
    fs.writeFileSync( './db/db.json', JSON.stringify( notes ) )

    res.send( { message: `New Note Added *${newNote.title}*` } )
});




app.listen(PORT, function() {
    console.log( `Server listening on: http://localhost:${PORT}` );
  })
