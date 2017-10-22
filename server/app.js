var express = require('express');
var path = require('path');
var Checkers = require('./game/checkers.js');

const app = express();
const expressWs = require('express-ws')(app);

app.get('/', (req, res) => {
    res.send("OK");
});

let users = new Set();
let sockets = {};
let rooms = {};

app.ws('/sock', (ws, res) => {
    ws.on("message", (msg) => {
        console.log(msg);
        let args = msg.split(" ");
        if (args[0] === "OPEN") {
            users.add(ws);
            sockets[args[1]] = ws;
        } else if (args[0] === "MOVE"){
            let room = args[1];
            let from = args[2];
            let to = args[3];
            rooms[room].make_move(from,to);
            updatePlayers(room);
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
        rooms[room] = new Checkers(name,room);
        res.json(rooms[room]);
    } else {
        if (rooms[room].player2 == null) {
            console.log("Room already made. joining room");
            rooms[room].player2 = name;
            rooms[room].playable = true;
            updatePlayers(rooms[room]);
        }
    }
});

function updatePlayers(room) { 
    let a = sockets[room.player1];
    let b = sockets[room.player2];
    console.log(a != null)
    console.log(b != null)
    // console.log(room);
    a.send(JSON.stringify(room));
    b.send(JSON.stringify(room));
}

app.get('/room/:room', (req, res) => { 
    let roomName = req.params.room;
    res.send(rooms[roomName]);
});

var i = setInterval(() => {
    for (room in rooms) {
        if (users.has(sockets[rooms[room].player1] || users.has(sockets[rooms[room].player2]))) { }
        else {
            delete rooms[room];
            console.log("deleted empty room " + room);
        }
    }
} , 1000*120) //kill empty rooms every 2 minutes

app.listen(3001);

module.exports = app;