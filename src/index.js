import express from 'express';
import render from './helpers/render';

const app = express();

// interesting
app.use(express.static('public'));

app.get('*', (req, res) => {
    res.send(render(req));
});

app.listen(3000, () => {
    console.log('Listening on prot 3000');
});