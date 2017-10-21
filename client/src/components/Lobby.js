import React, {Component} from 'react'
import path from 'path'

export default class Lobby extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

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
            this.setState({success: true, game: info});
        });
    }
    render() {
        return (
            <div>
                <p>Hello, {this.props.user}!</p>
                <p>Create a new lobby:</p>
                <form
                    onSubmit={(e) => {
                    this.makeRoom(this.state.roomName);
                    e.preventDefault();
                }}>
                    <label htmlFor="roomName">Room Name:
                    </label>
                    <input
                        type="text"
                        name="n"
                        autoFocus={true}
                        onChange={(e) => this.handleChange(e.target.value)}/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
}