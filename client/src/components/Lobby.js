import React, {Component} from 'react'
import Game from './Game.js'
import path from 'path'

export default class Lobby extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.sock = null;
        this.findLobbies();
    }

    componentDidMount() {
        this.sock = new WebSocket('ws://'+window.location.host+'/sock');
        console.log(window.location.host);
        this.sock.onopen = (e => {
            console.log("sending info");
            this
                .sock
                .send("OPEN " + this.props.user);
        });
        this.sock.onmessage = (msg => {
            console.log(msg);
            let gameState = JSON.parse(msg.data);
            console.log("got update")
            this.setState({game: gameState});
        });
        console.log(this.sock);

    };

    handleChange(val) {
        this.setState({roomName: val});
    }
    makeRoom(roomID) {
        fetch(path.join('/create_room/', this.props.user, roomID)).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                this.setState({success: false});
            }
        }).then(info => {
            console.log(info);
            this.setState({success: true, game: info});
        });
    }
    findLobbies = () => {
        fetch('/fetch_rooms/').then((res) => {
            if (res.ok) {
                return res.json();
            }
        }).then((info) => {
            console.log(info);
            this.setState({
                lobbies: Object.values(info)
            });
        });
    };
    lobbyList = (k, v) => {
        if (k.player2 === null) 
            return <p key={v}><b>Player:</b> {k.player1}  <i style={{marginLeft:'5px'}}>Room:</i> {k.roomID}     
                <button style={{marginLeft:'10px'}}
                    onClick={(e) => {
                    this.makeRoom(k.roomID);
                    e.preventDefault();
                }}>Join</button>
            </p>
    }
    render() {
        return this.state.game === undefined
            ? (
                <div id="lobby">
                    <p>Hello, {this.props.user}!</p>
                    <p>Create a new lobby:</p>
                    <form
                        onSubmit={(e) => {
                        this.makeRoom(this.state.roomName);
                        e.preventDefault();
                    }}>
                        <label htmlFor="roomName"><b>Room Name:</b>
                        </label>
                        <input style={{ margin: '5px' }}
                            type="text"
                            name="n"
                            autoFocus={true}
                            onChange={(e) => this.handleChange(e.target.value)}/>
                        <input type="submit" value="Submit" style={{margin:'5px'}}/>
                    </form>
                    <p>Or, join an existing one:</p>
                    {this.state.lobbies !== undefined
                        ? this
                            .state
                            .lobbies
                            .map(this.lobbyList)
                        : ''}
                </div>
            )
            : <Game board={this.state.game} name={this.props.user}/>
    }
}