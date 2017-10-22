import React, {Component} from 'react';

export default class Game extends Component {
    render() {
        return <div>
            {this.draw(this.props.board)}
        </div>
    };

    handleClick(id)
    {
        console.log(id);
    };
    displayBoard = (e, i) => {
        var isWhite = (Math.floor((i / 8) % 2) + (i % 2)) % 2;
        if (e === null) {
            return <div style={tile[isWhite]} key={i}></div>
        } else {
            return <div
                onClick={(e) => this.handleClick(i)}
                style={tile[isWhite]}
                key={i}>
                <div className={pieceMap[e]}></div>
            </div>
        }
    };
    draw(game) {
        return (
            <div>
            <div style={boardStyle}>
                {game
                    .board
                    .map(this.displayBoard)}
            </div>
            <div>
                <p>{game.player1} is White</p>
                <p>{game.player2 == null ? "Waiting for player 2" : game.player2 + " is Red"} </p>
            </div>
            </div>
        );
    }
};

const boardStyle = {
    maxWidth: '640px',
    maxHeight: '640px',
    width:'100%',
    height:'100%',
    backgroundColor: '#333',
    display: 'flex',
    flexFlow: "row wrap"
}

const pieceMap = {
    1: 'red',
    2: 'white'
}

const tile = {
    0: { //white
        width: '80px',
        height: '80px',
        backgroundColor: '#fff'
    },
    1: { //black
        width: '80px',
        height: '80px',
        backgroundColor: '#777'
    }
}