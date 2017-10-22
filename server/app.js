var express = require('express');
var path = require('path');
var Checkers = require('./game/checkers.js');

const app = express();
const expressWs = require('express-ws')(app);

app.get('/', (req, res) => {
    res.send("OK");
});

let users = new Set();
let rooms = {};

app.ws('/sock', (ws, res) => {
    ws.on("message", (msg) => {
        console.log(msg);
        if (msg === "OPEN") {
            users.add(ws);
        }

    });

    ws.on("close", () => {
        console.log("closing")
        users.delete(ws);
    });
});

app.get('/create_room/:name/:room', (req, res) => {
    console.log(req.params);
    let name = req.params.name;
    let room = req.params.room;
    console.log(name + " has requested a room: " + room);
    if (rooms[room] == undefined) {
        console.log("Ok! We can make you a room");
        rooms[room] = new Checkers(name);
        res.json(rooms[room]);
    } else {
        console.log("Possible conflict, check room");
    }
});

app.get('/room/:room', (req, res) => { 
    let roomName = req.params.room;
    res.send(rooms.roomName);
});

app.listen(3001);

module.exports = app;