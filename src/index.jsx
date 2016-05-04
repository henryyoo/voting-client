import React from 'react';
import ReactDOM from 'react-dom';
import Voting from './components/voting';
import reducer from './reducer';
import Routes from '../config/routes';
import {createStore, applyMiddleware} from 'redux';
import remoteActionMiddleWare from './remote_action_middleware';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import {setState} from './action_creators';

const socket = io(`${location.protocol}//${location.hostname}:8090`);

const createStoreWithMiddleWare = applyMiddleware(remoteActionMiddleWare(socket))(createStore);
const store = createStoreWithMiddleWare(reducer);


socket.on('state', state=> store.dispatch(setState(state)));
ReactDOM.render(
  <Provider store= {store}>
    {Routes}
  </Provider>,
  document.getElementById('app')
);
