import React, { Component } from 'react';
import axios from 'axios';
//import { Link } from 'react-router';

export default class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topStoriesIds: [],
      topStories: []
    };
  }
  
  componentWillMount() {

    let axiosGets = [];

    const getItem = (itemId) => {
      return axiosGets.push(axios.get('https://hacker-news.firebaseio.com/v0/item/' + itemId + '.json?print=pretty'));
    }

    const url = 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty';

    axios.get(url).then(res => {
      
      this.setState({topStoriesIds: res.data.slice(0,30)})
      //console.log('sfsd:', this.state.topStoriesIds);
      this.state.topStoriesIds.forEach(getItem);
      //console.log('gg:', axiosGets.length, axiosGets[0])
      axios.all(axiosGets).then((result) => {
        let topStories = [];
       // console.log('ehh: ', result)
        result.forEach((resultItem) => {
          topStories.push(resultItem.data);
          })
        this.setState({topStories: topStories});
        console.log('len: ', this.state.topStories)
      });
    }); 
  }
 
  render() {
    return (
    <ol>
     {this.state.topStories.map(topStories => 
     <li key={topStories.id}><a href={ topStories.url }>{topStories.title}</a> by { topStories.by }</li>
     )}
   </ol>
    );
  }
}

//export default News;
