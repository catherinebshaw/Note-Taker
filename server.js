const express = require('express')
const fs = require('fs')
// import { v4 as uuidv4 } from 'uuid';
const  uuid= require('node-uuid')
const app = express()

//set the port 
const PORT = process.env.PORT || 3000

let notes = JSON.parse (fs.readFileSync('./db/db.json', 'utf8'));

app.use( express.static('public') )
// accept incoming POST requests
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


// for Heroku
app.get("/", function(req, res) {
    res.json(path.join(__direname, "/public/index.html"))
});

//Data - get previous notes
app.get("/api/notes",function(req, res) {
    console.log( `getting previous notes.. ${notes} `)
    res.send(notes);
});

//create new notes 
app.post('/api/notes', function(req, res) {
    console.log( '[POST /api/notes]', req.body )
    // const newNote = {
    //     id: uuid(),
    //     title: req.body.title,
    //     text: req.body.text,
    // }
    let newNote = req.body
    newNote.id =uuid()
    console.log( `[POST] (${notes.length} entries), adding: \n`, newNote)
    notes.push( newNote )
    // save to a file, as a string like localStorage
    fs.writeFileSync( './db/db.json', JSON.stringify( notes ) )

    res.redirect('/notes.html' )
})

app.delete( '/api/notes/:id', function (req,res){
    const id = req.params.id
    console.log(id)
    notes = notes.filter(note=>note.id != id)

    res.end( {message: `Deleted ${id}`})
})


app.listen(PORT, function() {
    console.log( `Server listening on: http://localhost:${PORT}` );
  })
