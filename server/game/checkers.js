class Checkers {
    constructor(player) {
        this.player1 = player;
        this.player2 = null;
        this.playable = false;
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
                    this.board[index] = 0; //no tile
                } 
            }
        }
        this.board[8] = 1;
        this.board[16] = null;
        this.board[40] = 2;
        this.board[48] = null;
        this.board[56] = 2;
        
    }

}

module.exports = Checkers;