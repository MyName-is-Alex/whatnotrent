import React, { Component } from 'react';
import MainSlider from './HomePage/MainSlider'

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <MainSlider />
      </div>
    );
  }
}
