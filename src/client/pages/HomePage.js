import React, { useState } from 'react';
/**
 * nodemon 加上 webpack --watch 实现了，代码改变 rerun webpack，并且 rerun server
 * 那么除了上面的底层实现，浏览器自动重新加载，不用手动刷新，要怎么做呢？？
 */
const Home = () => {
    const [name, setName] = useState('ZZZ');
    // well, apparently it's not working in this way
    return (
        [
            <div key='key1'>I'm the home component, { name }</div>,
            <button key="key2" onClick={() => setName('SLY')}>Click me</button>
        ]
    );
};

export default {
    component: Home, 
};