import React, { Component } from "react";

export default class LandingDetails extends Component {
  render() {
    return (
      <div id="colorlib-services">
        <div class="container">
          <div class="row">
            <div class="col-md-8 col-md-offset-2 text-center colorlib-heading animate-box">
              <h2>How It Works</h2>
              <p>
                GymBosses born out of the necesity of a simple yet powerful tool
                to manage your Gym. Our clients are small to middle size Gyms
                who want basic Client and Payment management and simple access
                control.
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4 text-center animate-box">
              <div class="services">
                <span class="icon">
                  <i class="icon-wink" />
                </span>
                <div class="desc">
                  <h3>Clients &amp; Payments</h3>
                  <p>
                    You will be able to get an insight of who your clients are
                    and reach those who have churn. You will also have a super
                    easy interface to access their info and control their
                    payments.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-4 text-center animate-box">
              <div class="services">
                <span class="icon">
                  <i class="icon-lock" />
                </span>
                <div class="desc">
                  <h3>Access Control</h3>
                  <p>
                    This is usually an expensive problem. With GymBosses you
                    just need a small tablet to let your clients enter their
                    identification number to control their access.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-4 text-center animate-box">
              <div class="services">
                <span class="icon">
                  <i class="icon-mobile" />
                </span>
                <div class="desc">
                  <h3>Remote access</h3>
                  <p>
                    This is a web application which means the data is stored in
                    secure servers that can be accessed from any device. Lets
                    say you want to check how many people checked in today
                    before actually getting to the Gym, DONE!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
