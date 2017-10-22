import React, {Component} from 'react';

export default class Game extends Component {
    render() {
        return <div>
            {this.draw(this.props.board)}
        </div>
    };

    draw(game) {
        return (
            <div style={boardStyle}>
                {game
                    .board
                    .map((e, i) => {
                        var isWhite = (Math.floor((i / 8) % 2) + (i % 2)) % 2;
                        console.log(isWhite);
                        if (e === null) 
                            return <div style={tile[isWhite]} key={i}></div>
                        else 
                            return <div style={tile[isWhite]} key={i}>
                                <div className={pieceMap[e]}></div>
                            </div>
                    })}
            </div>
        );
    }
}

const boardStyle = {
    maxWidth: '640px',
    maxHeight: '640px',
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