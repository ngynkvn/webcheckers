var express = require('express');
var path = require('path');
// var checkers = require('./game/checkers.js');

const app = express();

app.get('/', (req, res) => {
    res.send("OK");
});

rooms = {}

app.get('/create_room/:name/:room', (req, res) => {
    console.log(req.params);
    let name = req.params.name;
    let room = req.params.room;

    console.log(name + " has requested a room: " + room);
    if (rooms.room == undefined) { 
        console.log("Ok! We can make you a room");
        // rooms.room = new Checkers();
        res.json({test:"okbro"});
    } else {
        console.log("Possible conflict, check room");
    }
});

module.exports = app;