import React, { Component } from "react";

export default class LandingClientsSay extends Component {
  render() {
    return (
      <div
        id="colorlib-testimony"
        class="testimony-img"
        style={{
          backgroundImage:
            "url(../../../static/landing/images/client-say-background.jpg)"
        }}
        data-stellar-background-ratio="0.5"
      >
        <div class="overlay" />
        <div class="container">
          <div class="row">
            <div class="col-md-8 col-md-offset-2 text-center colorlib-heading animate-box">
              <h2>My Clients Says</h2>
            </div>
          </div>
          <div class="row">
            <div class="col-md-8 col-md-offset-2 text-center">
              <div class="row animate-box">
                <div class="owl-carousel1">
                  <div class="item">
                    <div class="testimony-slide">
                      <div class="testimony-wrap">
                        <figure
                          class="figure-img"
                          style={{
                            backgroundImage:
                              "url(../../../static/landing/images/person1.jpg)"
                          }}
                        />
                        <blockquote>
                          <span>Cristian</span>
                          <p>
                            The app is like a 1979 Ford Falcon, it's simple, all
                            you need and super powerful.
                          </p>
                        </blockquote>
                      </div>
                    </div>
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
