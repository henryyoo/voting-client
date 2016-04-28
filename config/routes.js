import React from 'react';
import {Router, Route, hashHistory} from 'react-router';
import {VotingContainer} from '../src/components/voting';
import App from '../src/components/app';
import {ResultContainer} from '../src/components/result';

const routes =
<Router history={hashHistory}>
  <Route component={App}>
    <Route path='/' component = {VotingContainer} />
    <Route path='/results' component = {ResultContainer} />
  </Route>
</Router>;

export default routes;
