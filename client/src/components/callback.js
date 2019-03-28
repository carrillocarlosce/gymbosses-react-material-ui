import React, { Component } from 'react';
import Auth from '../Auth/auth';

class Callback extends Component {
  componentDidMount(){
      const auth = new Auth();
      auth.handleAuthentication()
  }
  render() {
    return (
      <div  >
        loading...
      </div>
    );
  }
}

export default Callback;