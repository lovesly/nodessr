// Startup point for the client side application
import React from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';

const content = (
    <BrowserRouter>
        <Routes />
    </BrowserRouter>
);
// hydrate??
ReactDOM.hydrate(content, document.querySelector('#app'));