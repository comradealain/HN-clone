import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './News.css';

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
    this.fetchStories();
  }


  fetchStories = () => {
 const url = 'http://api.hackerwebapp.com/news?page=' + (this.state.pageNo + 1);
    axios.get(url).then(res => {
      
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
     {this.state.topStories.map(story => 
     <li id="story" key={story.id}>
     <div>
     <a href={ story.url }>{story.title}</a> 
     (<Link id="comments" to={{ pathname: "/item/"+story.id, state: { pageNo: this.state.pageNo }}}>{ story.comments_count } comments</Link>)
     <p> { this.getFavicon(story.domain) } <a id="domain" href={ story.domain}> {story.domain} </a> | by { story.user } | Score: {story.points} </p>
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
