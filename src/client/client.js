// Startup point for the client side application
import React from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Routes from './Routes';
import reducers from './reducers/index';

// what about redux-saga?
const store = createStore(reducers, {}, applyMiddleware(thunk));

const content = (
    <Provider store={store}>
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    </Provider>
);
// hydrate??
ReactDOM.hydrate(content, document.querySelector('#app'));