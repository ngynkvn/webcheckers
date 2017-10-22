import React, { Component } from 'react';
import path from 'path'
import Login from './components/Login'
import Lobby from './components/Lobby'

class App extends Component {

  constructor(props) { 
    super(props);
    this.state = { userName: null };
    this.sendData = this.sendData.bind(this);
  }

  sendData(val) {
    fetch(path.join("/userok/", val)).then((req, res) => {
      console.log(req);
      if (req.ok) {
        this.setState({ userName: val });
      } else {
        this.setState({ problem: true });
      }
    });
  }

  render() {
    return this.state.userName == null ? <Login sendData={this.sendData} problem={this.state.problem} /> : <Lobby user={this.state.userName}/>
  }
}

export default App;
