import auth0 from 'auth0-js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'gymbosses.auth0.com',
    clientID: '6xwu89vXD1KZ592IJobbbZU1d2Wq5iUg',
    redirectUri: 'http://localhost:8080/callback',
    responseType: 'token id_token',
    scope: 'openid profile'
  });

  login() {
    this.auth0.authorize();
  }
}