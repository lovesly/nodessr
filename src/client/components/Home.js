import React, { useState } from 'react';

const Home = () => {
    const [name, setName] = useState('ZZ');
    return (
        <>
            <div>I'm the home component, { name }</div>
            <h1 onClick={setName('SLY')}>Click me</h1>
        </>
    );
};

export default Home;