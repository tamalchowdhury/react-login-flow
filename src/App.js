import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

// Degug mode:
const DEBUG = true;
function debug(...args) {
  if (DEBUG) console.log('DEBUG:', ...args);
}

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <div>Show some fancy things here..</div>
      </div>
    );
  }
}

class Homepage extends React.Component {
  // Login function to log the user in
  login = (e) => {
    // Prevent the form from reloading the page
    e.preventDefault();
    // Get the username and password from the form
    let username = e.target.username.value;
    let password = e.target.password.value;

    // Do nothing if user left the fields blank
    if (username && password) {
      debug('username:', username, 'password:', password);
      debug("Looks good, let's process the login..");
      /* Send the username and password to the backend
       * to check if the user exists
       * If the username and password combination is correct
       * Log the user in by setting up the state: */
      // Pseudo login check:
      if (username == 'admin' && password == '1234') {
        debug('Logging you in..');
        this.props.storeLoginInfo(username, 'dummytoken');
      } else {
        debug('Username and or password incorect');
        // Reset the form and display some kind of warning
        e.target.reset();
      }
    } else {
      // Do something about it, like display an error message or something.
      debug('Fields are missing.');
    }
  };

  render() {
    return (
      <div>
        <h1>Login/Register</h1>
        <div className="login-reg-area">
          <div className="login">
            <h3>Login</h3>
            <form onSubmit={this.login}>
              <input type="text" name="username" />
              <input type="password" name="password" />
              <button>Login</button>
            </form>
          </div>
          <div className="register">
            <h3>Register</h3>
            <form action="">
              <input type="text" name="username" />
              <input type="password" name="password" />
              <input type="password" name="password-again" />
              <button>Register</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  state = {
    loggedIn: false,
    username: '',
    token: ''
  };

  // Stores the login info by setting the credentials on the app state
  storeLoginInfo = (username, token) => {
    debug("It's working");
    this.setState({
      loggedIn: true,
      username,
      token
    });
  };

  render() {
    const Page = this.state.loggedIn ? (
      <Dashboard />
    ) : (
      <Homepage storeLoginInfo={this.storeLoginInfo} />
    );
    return <div id="app">{Page}</div>;
  }
}

export default App;
