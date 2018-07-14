import React, { Component } from 'react';

export default class Login extends Component {
    authlogin(){
        fetch('http://localhost:3000/')
        .then((response) => response.json())
        .then((responseJson) => {
            window.location=responseJson.url;
        })
        .catch((error) => {
            console.error(error);
          });
    }

    render(){
        return(
        <button 
            className="btn btn-default"
            onClick={this.authlogin}> 
            Login using google
        </button>
        );
    }

    
}