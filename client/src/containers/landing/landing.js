import React, { Component } from "react";
import LaindingNavigation from "../../components/landing/navigation";
import LaindingIntro from "../../components/landing/intro";
import LaindingDetails from "../../components/landing/details";
import LaindingClientsSay from "../../components/landing/clients_say";
import LaindingAccomplishment from "../../components/landing/accomplishment";
import LaindingPricing from "../../components/landing/princing";

import '../../../static/landing/css/animate.css';
import '../../../static/landing/css/icomoon.css';
import '../../../static/landing/css/bootstrap.css';
import '../../../static/landing/fonts/flaticon/font/flaticon.css';
import '../../../static/landing/css/style.css';
import 'typeface-roboto'

export default class LandingContainer extends Component {
  render() {
    return (
      <div>
        <div class="colorlib-loader" />
        <div id="page">
          <LaindingNavigation />
          <LaindingIntro />
          <LaindingDetails />
          <LaindingClientsSay />
          <LaindingAccomplishment />
          <LaindingPricing />
        </div>

        <div class="gototop js-top">
          <a href="#" class="js-gotop">
            <i class="icon-arrow-up2" />
          </a>
        </div>
      </div>
    );
  }
}
