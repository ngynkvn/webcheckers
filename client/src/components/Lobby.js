import React, { Component } from 'react'

export default class Lobby extends Component { 
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    componentDidMount() { 
        let ws = new WebSocket();
    }

    render() { 
        return (<div>
        <p>Hello, {this.props.user}!</p>
        <p>Create a new lobby:</p>    
        <form onSubmit={(e) => (this.submit(), e.preventDefault())}>
        <label htmlFor="roomName" >Room Name: </label>
        <input type="text" name="roomname" onChange={(e) => this.handleChange(e)}/>
        <input type="submit" value="Submit"/>
        </form>  
        </div>    
        )    
    }
}