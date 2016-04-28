import React from 'react';
import ReactDOM from 'react-dom';
import Voting from './components/voting';
import reducer from './reducer';
import Routes from '../config/routes';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import io from 'socket.io-client';

const store = createStore(reducer);

const socket = io(`${location.protocol}//${location.hostname}:8090`);

socket.on('state', state=> store.dispatch({type:"SET_STATE", state}));
ReactDOM.render(
  <Provider store= {store}>
    {Routes}
  </Provider>,
  document.getElementById('app')
);
