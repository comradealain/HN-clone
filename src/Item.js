import React, { Component } from 'react';
//import axios from 'axios';
//import './News.css';
//import { Link } from 'react-router';


export default class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNo: props.location.state.pageNo 
    }
  }

  componentWillMount() {
  console.log('lllll', this.state.pageNo)
  }
  render() {

    return (
              <h1></h1>
            );
  }

}



