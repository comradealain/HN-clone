import React from 'react';
import ReactDOM from 'react-dom';
import News from './News';
import Item from './Item';
import { Route } from 'react-router';
import { BrowserRouter,Switch } from 'react-router-dom';
ReactDOM.render((
   <BrowserRouter>
   <Switch>
   <Route exact path="/" component={News} />
   {/*<Route path="news" component={News} />*/}
   <Route path="/item" component={Item} />
   </Switch>
   </BrowserRouter>
), document.getElementById('root'));
