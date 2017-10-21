import React, { Component } from 'react';
import Login from './components/Login'
import Lobby from './components/Lobby'

class App extends Component {

  constructor(props) { 
    super(props);
    this.state = { userName: null };
    this.sendData = this.sendData.bind(this);
  }

  sendData(val) { 
    this.setState({ userName: val });
  }

  render() {
    return this.state.userName == null ? <Login sendData={this.sendData} /> : <Lobby user={this.state.userName}/>
  }
}

export default App;
