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
    this.fetchStories(this.state.pageNo);
  }


  fetchStories = (pageNo) => {
 const url = 'http://api.hackerwebapp.com/news?page=' + (this.state.pageNo + 1);
 console.log(url)
    axios.get(url).then(res => {
      
            console.log(res.data)
      this.setState({topStories: res.data});
    });  
  }
  getNewStoriesData = () => {
  console.log('called', this.state.pageNo)
/*
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
    */
     
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
    this.fetchStories(this.state.pageNo);
  });
 }

 previous = () => {

  this.setState({pageNo: this.state.pageNo - 1}, () => {
    this.fetchStories(this.state.pageNo);
  });
 }

 getFavicon = (domain) => {
   let faviconUrl = "http://www.google.com/s2/favicons?domain_url=" + domain;
   return <img src={faviconUrl} />;
 }

  render() {
    return (
   <div>
    <ol start={ this.state.pageNo * this.pageSize + 1 }>
     {this.state.topStories.map(topStories => 
     <li key={topStories.id}>
     <div id="story">
     <a href={ topStories.url }>{topStories.title}</a> by { topStories.user } Score: { topStories.points }
     <p> { this.getFavicon(topStories.domain) } {topStories.domain} </p>
     </div>
     </li>
     )}
   </ol>
    <button onClick={this.more}>More</button> 

    { this.state.pageNo > 0 && <button onClick={this.previous}>Previous</button> }
   </div>
    );
  }
}
