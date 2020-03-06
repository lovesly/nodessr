// Startup point for the client side application
import React from 'react';
import ReactDOM from "react-dom";
import Home from './components/Home';

// hydrate??
ReactDOM.hydrate(<Home />, document.querySelector('#app'));