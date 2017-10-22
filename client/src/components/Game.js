import React, {Component} from 'react';

export default class Game extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            selected: null
        };
    }

    render() {
        return <div>
            {this.draw(this.props.board)}
            {this.playerStatus()}
        </div>
    };
    handleClick(id)
    {
        let selected = this.state.selected;
        if (selected === null) {
            this.setState({selected:id});
        }
        else if (selected) {
            if (selected === id) {
                this.setState({selected:null});
            } else {
                console.log("move made!");
            }
        }
    };
    playerStatus = () => <div>
                            <p>Player 1 is {this.props.board.player1}</p>
                            <p>{this.props.board.player2 == null ? "Waiting for player 2" : "Player 2 is "+this.props.board.player2}</p>
                           </div>
    displayBoard = (e, i) => {
        var isWhite = (Math.floor((i / 8) % 2) + (i % 2)) % 2;
        var style = tile[isWhite];
        var selectIndicator = this.state.selected === i ? "highlight" : "";
        if (e === null) {
            return <div style={style} key={i}></div>
        } else {
            return <div onClick={() => {this.handleClick(i)}} style={style} key={i}>
                <div className={pieceMap[e] + " piece " + selectIndicator}></div>
            </div>
        }
    };
    draw(game) {
        return ( <div>
                <div style={boardStyle}>
                    {game
                        .board
                        .map(this.displayBoard)}
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
}

const pieceMap = {
    1: 'red',
    2: 'white'
}

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
}