import React, { Component } from 'react';
import {Header} from './Header';
import {Main} from './Main'
import '../styles/App.css';
import {TOKEN_KEY} from '../constant'

class App extends Component {
    state = {
        // isLoggedIn: !!localStorage.getItem((TOKEN_KEY)),
        isLoggedIn: Boolean(localStorage.getItem((TOKEN_KEY))),
    }

    handleLogin = (token) => {
        localStorage.setItem(TOKEN_KEY, token);
        this.setState({isLoggedIn:true})
    }

    handleLogOut = () => {
        localStorage.removeItem(TOKEN_KEY);
        this.setState({isLoggedIn:false});
    }
  render() {
    return (
      <div className="App">
          <Header isLoggedIn={this.state.isLoggedIn} handleLogOut={this.handleLogOut}/>
          <Main isLoggedIn={this.state.isLoggedIn} handleLogin={this.handleLogin}/>
      </div>
    );
  }
}

export default App;
