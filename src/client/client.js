// Startup point for the client side application
import React from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import axios from 'axios';
import Routes from './Routes';
import reducers from './reducers/index';

const axiosInstance = axios.create({
    baseURL: '/api',
});
// what about redux-saga?
const initState = window.INITIAL_STATE || {};
const store = createStore(reducers, initState, applyMiddleware(thunk.withExtraArgument(axiosInstance)));

const content = (
    <Provider store={store}>
        <BrowserRouter>
            <div>{ renderRoutes(Routes) }</div>
        </BrowserRouter>
    </Provider>
);
// hydrate??
ReactDOM.hydrate(content, document.querySelector('#app'));