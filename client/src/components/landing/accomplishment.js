import React, { Component } from "react";

export default class LandingAccomplishment extends Component {
  render() {
    return (
      <div
        id="colorlib-counter"
        class="colorlib-counters"
        style={{
          backgroundImage:
            "url(../../../static/landing/images/accomplishment.jpg)"
        }}
        data-stellar-background-ratio="0.5"
      >
        <div class="overlay" />
        <div class="container">
          <div class="row">
            <div class="col-md-8 col-md-offset-2 text-center colorlib-heading animate-box">
              <h2>My Accomplishment</h2>
            </div>
          </div>
          <div class="row">
            <div class="col-md-10 col-md-offset-1">
              <div class="col-md-4 col-sm-4 text-center animate-box">
                <div class="counter-entry">
                  <span class="icon">
                    <i class="icon-library" />
                  </span>
                  <div class="desc">
                    <span
                      class="colorlib-counter js-counter"
                      data-from="0"
                      data-to="4"
                      data-speed="500"
                      data-refresh-interval="50"
                    />
                    <span class="colorlib-counter-label">Gyms</span>
                  </div>
                </div>
              </div>
              <div class="col-md-4 col-sm-4 text-center animate-box">
                <div class="counter-entry">
                  <span class="icon">
                    <i class="icon-map" />
                  </span>
                  <div class="desc">
                    <span
                      class="colorlib-counter js-counter"
                      data-from="0"
                      data-to="1"
                      data-speed="500"
                      data-refresh-interval="50"
                    />
                    <span class="colorlib-counter-label">Countries</span>
                  </div>
                </div>
              </div>
              <div class="col-md-4 col-sm-4 text-center animate-box">
                <div class="counter-entry">
                  <span class="icon">
                    <i class="icon-user2" />
                  </span>
                  <div class="desc">
                    <span
                      class="colorlib-counter js-counter"
                      data-from="0"
                      data-to="1000"
                      data-speed="5000"
                      data-refresh-interval="50"
                    />
                    <span class="colorlib-counter-label">
                      Monthly active Clients
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
