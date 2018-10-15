import React, { Component } from 'react';

export default class Login extends Component {
    authlogin(){
        fetch('https://gymbosses.herokuapp.com/api/v1/')
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