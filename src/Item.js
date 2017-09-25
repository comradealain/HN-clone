import React, { Component } from "react";
import axios from 'axios';

export default class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNo: props.location.state.pageNo,
      itemId: props.location.pathname.split("/")[2],
      story: {}
    };
  }

  componentWillMount() {
       this.fetchStoryData();
  }

  fetchStoryData = () => {
 const url = "http://api.hackerwebapp.com/item/" + this.state.itemId;
    axios.get(url).then(res => {
     console.log(res) 
      this.setState({story: res.data});
    });  
  }
  render() {

    return (
              <h1>{ this.state.story.title }</h1>
    );
  }
}



