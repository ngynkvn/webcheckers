import React, {Component} from 'react';
import path from 'path';

export default class Game extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: null
        };
        this.color = this.props.board.player1 === this.props.name
            ? "white"
            : "red";
    };

    render() {
        return <div>
            {this.draw(this.props.board)}
            {this.playerStatus()}
        </div>
    };
    handleClick(id)
    {
        let selected = this.state.selected;
        var colorsMatch = pieceMap[this.props.board.board[id]] === this.color;
        var correctTurn = this.props.board.toPlay === this.color;
        console.log(this.props.board.board[id]);
        if (selected === null && colorsMatch && correctTurn) {
            this.setState({selected: id});
        } else if (selected) {
            if (selected === id) {
                this.setState({selected: null});
            } else if (this.props.board.board[id] === 0 || this.props.board.board[id] === null) {
                fetch(path.join('/make_move/', this.props.board.roomID.toString(), selected.toString(), id.toString())).then((res) => {
                    if (res.ok) {
                        console.log("move made!");
                        this.setState({selected: null});
                    }
                });
            }
        }
    };
    playerStatus = () => <div id="status">
        <p>Player 1 is {this.props.board.player1}</p>
        <p>{this.props.board.player2 == null
                ? "Waiting for player 2"
                : "Player 2 is " + this.props.board.player2}</p>
        <p>It is {this.props.board.toPlay === 'white'
                ? this.props.board.player1
                : this.props.board.player2}'s turn.</p>
    </div>
    displayBoard = (e, i) => {
        var tileColor = (Math.floor((i / 8) % 2) + (i % 2)) % 2;
        var style = tile[tileColor];
        var selectIndicator = this.state.selected === i
            ? "highlight"
            : "";
        if (e === 0 || e === 99 || e === null) {
            return <div
                style={style}
                key={i}
                onClick={() => {
                this.handleClick(i)
            }}></div>
        } else {
            return <div
                onClick={() => {
                this.handleClick(i)
            }}
                style={style}
                key={i}>
                <div className={pieceMap[e] + " piece " + selectIndicator}></div>
            </div>
        }
    };
    draw(game) {
        return (
            <div id="game">
                <div style={boardStyle}>
                    {game
                        .board
                        .map(this.displayBoard)
}
                </div>
            </div>
        );
    }
};

const boardStyle = {
    maxWidth: '640px',
    maxHeight: '640px',
    width: '100%',
    height: '100%',
    backgroundColor: '#333',
    display: 'flex',
    flexFlow: "row wrap"
};

const pieceMap = {
    1: 'red',
    2: 'white',
    0: 'null',
    99: 'null'
};

const tile = {
    0: { //white
        height: '80px',
        width: '80px',
        backgroundColor: '#ddd'
    },
    1: { //black
        height: '80px',
        width: '80px',
        backgroundColor: '#777'
    }
};