import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
   return <img alt={ domain } src={faviconUrl} />;
 }

  render() {
    return (
   <div>
    <ol start={ this.state.pageNo * this.pageSize + 1 }>
     {this.state.topStories.map(topStories => 
     <li id="story" key={topStories.id}>
     <div>
     <a href={ topStories.url }>{topStories.title}</a> (<Link id="comments" to="/item">{ topStories.comments_count } comments</Link>)
     <p> { this.getFavicon(topStories.domain) } <a id="domain" href={ topStories.domain}> {topStories.domain} </a> | by { topStories.user } | Score: {topStories.points} </p>
     </div>
     </li>
     )}
   </ol>
    <button onClick={this.more}>More</button> 
    { this.state.pageNo > 0 && <button onClick={this.previous}>Previous</button> }
    <Link to={{
      pathname: "/item",
      state: { pageNo: this.state.pageNo }
    }}> LOL </Link>
   </div>
    );
  }
}
