const moves = [9,7,-9,-7];
const pieceMap = {
    1: 'red',
    2: 'white',
    0: 'null',
    99: 'null'
};
class Checkers {
    constructor(player,roomID) {
        this.player1 = player;
        this.player2 = null;
        this.playable = false;
        this.toPlay = "white";
        this.roomID = roomID;
        this.pieceCount = [0,12, 12];
        this.board = new Array(64);
        for (var i = 0; i < 8; i++){
            var offset = i % 2;
            for (var j = 0; j < 8; j++){ 
                var index = i * 8 + j;
                if (index+offset == 64) break;
                if (i <= 2 && index % 2 == 1) {
                    this.board[index+offset] = 1; //whites
                } else if (i >= 5 && index % 2 == 1) {
                    this.board[index+offset] = 2; //blacks
                } else if (index % 2 == 1) {
                    this.board[index+offset] = 0; //no tile
                }
            }
        }
        this.board[8] = 1;
        this.board[16] = null;
        this.board[40] = 2;
        this.board[48] = null;
        this.board[56] = 2;
    }
    validMove(from, to) {
        var hop = dist(from, to) === 2;
        var jump = dist(from, to) === 8;
        console.log(from, to);
        console.log(dist(from, to));
        var forward = (this.toPlay === "white" ? to - from < 0 : to - from > 0);
        if (hop && forward) {
            return true;
        } else if (jump && forward) {
            //check middle tile
            var x = Math.floor(((to % 8) + (from % 8)) / 2);
            var y = Math.floor(((from / 8) + (to / 8)) / 2);
            var piece = this.board[x + y * 8];
            console.log(piece, x, y);
            var opp = opposite(this.toPlay);
            if (pieceMap[piece] === opp) {
                return true;
            }
        }
        return false;
    };
    make_move(from, to) {
        if (!this.playable) return false;
        if (this.validMove(from, to)) {
            this.board[to] = this.board[from];
            this.board[from] = 0;
            if (dist(from, to) == 8) { //jump
                var x = Math.floor(((to % 8) + (from % 8)) / 2);
                var y = Math.floor(((from / 8) + (to / 8)) / 2);
                this.pieceCount[this.board[x + y * 8]]--;
                this.board[x + y * 8] = 0;
            }
            this.toPlay = opposite(this.toPlay);
            return true;
        } else {
            return false;
        }
    };
}

function opposite(s) {
    return s === "red" ? "white" : "red";
}

function dist(from, to) { 
    var x1 = Math.floor(from / 8);
    var y1 = from % 8;
    var x2 = Math.floor(to / 8);
    var y2 = to % 8;
    var inside = Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
    return Math.floor(inside);
}

module.exports = Checkers;