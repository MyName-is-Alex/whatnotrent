import React, { Component } from 'react';
import MainSlider from './HomePage/MainSlider'
import ProductsHeader from './HomePage/ProductsHeader'
import Products from './HomePage/Products'

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <MainSlider />
        <ProductsHeader />
        <Products />  
      </div>
    );
  }
}
