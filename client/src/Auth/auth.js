import auth0 from 'auth0-js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'gymbosses.auth0.com',
    clientID: '2IBtGnafsfkTA6_KdyQJ0shZcRNyhxuT',
    redirectUri: 'http://localhost:8080/callback',
    responseType: 'token id_token',
    scope: 'openid'
  });

  login() {
    this.auth0.authorize();
  }
}