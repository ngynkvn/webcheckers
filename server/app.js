var express = require('express');
var path = require('path');
var Checkers = require('./game/checkers.js');

const app = express();
const expressWs = require('express-ws')(app);

app.use(express.static(path.join(__dirname, '../client/build')));

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
        rooms[room] = new Checkers(name, room);
        res.json(rooms[room]);
        res.sendStatus(200);
    } else {
        if (rooms[room].player2 == null) {
            console.log("Room already made. joining room");
            rooms[room].player2 = name;
            rooms[room].playable = true;
            updatePlayers(rooms[room]);
        }
    }
});

app.get('/userok/:username', (req, res) => { 
    console.log(req.params.username);
    if (sockets.hasOwnProperty(req.params.username)) {
        res.sendStatus(403);
    } else {
        res.sendStatus(200);
    }
});

app.get('/make_move/:room/:from/:to', (req, res) => {
    let roomID = req.params.room;
    let from = req.params.from;
    let to = req.params.to;
    if (rooms[roomID].make_move(from, to)) { 
        console.log("move was successful," + from + " " + to);
        updatePlayers(rooms[roomID]);
        res.sendStatus(200);
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

app.get('/fetch_rooms', (req, res) => {
    res.send(rooms);
})

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