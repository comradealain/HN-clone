import React from 'react';
import ReactDOM from 'react-dom';
import News from './News';
import { Router, Route, browserHistory } from 'react-router';

ReactDOM.render((
  <Router history={browserHistory}>
   <Route path="/" component={News} />
   {/*<Route path="news" component={News} />*/}
  </Router>
), document.getElementById('root'));
