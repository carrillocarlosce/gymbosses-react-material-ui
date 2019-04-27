import auth0 from 'auth0-js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'gymbosses.auth0.com',
    clientID: '6xwu89vXD1KZ592IJobbbZU1d2Wq5iUg',
    redirectUri: 'http://gymbosses.com/callback',
    responseType: 'token id_token',
    scope: 'openid profile'
  });

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        console.log(err)
      }
    });
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    localStorage.setItem('accessToken', authResult.accessToken);
    localStorage.setItem('expiresAt', expiresAt);
    localStorage.setItem('idToken', authResult.idToken);
    location.hash = '';
    location.pathname = 'home';
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}