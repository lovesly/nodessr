import express from 'express';
import render from './helpers/render';
import createStore from './helpers/createStore';

const app = express();

// interesting
app.use(express.static('public'));

app.get('*', (req, res) => {
    const store = createStore();
    // init and load data into the store

    res.send(render(req, store));
});

app.listen(3000, () => {
    console.log('Listening on prot 3000');
});

// follow up, after we've done the typescript learning, we could refactor this project
// with typescript!