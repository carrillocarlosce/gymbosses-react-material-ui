import React, { Component } from "react";

export default class LandingIntro extends Component {
  render() {
    return (
      <div class="colorlib-intro">
        <div class="container">
          <div class="row">
            <div class="col-md-8 col-md-offset-2 text-center">
              <div class="intro">
                <h1>Take your Gym to the next level</h1>
                <p>
                  We took your old software, remove the millon functionalities
                  no one uses, and left what you need to Manage your clients,
                  control payments and access to your Gym.
                </p>
                <p>
                  <a href="/new_account" class="btn btn-primary btn-outline btn-md">
                    Free 30 days Trial
                  </a>{" "}
                  <a
                    href="/someGym/dashboard/"
                    class="btn btn-primary btn-outline btn-md"
                  >
                    Log in
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
