import React, { Component } from 'react';
import axios from 'axios';
import './News.css';
//import { Link } from 'react-router';

export default class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topStoriesIds: [],
      topStories: [],
      totalStoriesIds: [],
      pageNo: 0
    };

    this.pageSize = 30;
  }
  
  componentWillMount() {

    const url = 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty';

    axios.get(url).then(res => {
      
      this.setState({totalStoriesIds: res.data}, () => {

        this.getStoriesData();
      });
    }); 
  }

  getStoriesData = () => {
  console.log('called', this.state.pageNo)

   let axiosGets = [];

     const getItem = (itemId) => {
       return axiosGets.push(axios.get('https://hacker-news.firebaseio.com/v0/item/' + itemId + '.json?print=pretty'));
     }

     let initialIndex = this.state.pageNo * this.pageSize; 
     this.setState({topStoriesIds: this.state.totalStoriesIds.slice(initialIndex, initialIndex + this.pageSize)},() => {
     console.log('happp: ', this.state.topStoriesIds[0])
       this.state.topStoriesIds.forEach(getItem);
       axios.all(axiosGets).then((result) => {
 
         let topStories = [];
         result.forEach((resultItem) => {
           topStories.push(resultItem.data);
         })
 
         this.setState({topStories: topStories});
       });
    });
  }

  
  more = () => {

  this.setState({pageNo: this.state.pageNo + 1}, () => {

    this.getStoriesData();
  });
 }

 previous = () => {

  this.setState({pageNo: this.state.pageNo - 1}, () => {

    this.getStoriesData();
  });
 }

  render() {
    return (
   <div>
    <ol start={ this.state.pageNo * this.pageSize + 1 }>
     {this.state.topStories.map(topStories => 
     <li key={topStories.id}><a href={ topStories.url }>{topStories.title}</a> by { topStories.by } Score: { topStories.score }</li>
     )}
   </ol>
    <button onClick={this.more}>More</button> 

    { this.state.pageNo > 0 && <button onClick={this.previous}>Previous</button> }
   </div>
    );
  }
}
