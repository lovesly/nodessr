// import here? why can't we setup in webpack?
import express from 'express';
import { matchRoutes } from 'react-router-config';
import proxy from 'express-http-proxy';
import render from './helpers/render';
import createStore from './helpers/createStore';
import Routes from './client/Routes';

const app = express();

// 如果 heroku 太慢，我想部署在本地呢？
app.use('/api', proxy('http://react-ssr-api.herokuapp.com', {
    proxyReqOptDecorator(opts) {
        opts.header['x-forwarded-host'] = 'localhost:3000';
        return opts;
    }
}));
// interesting
app.use(express.static('public'));

app.get('*', (req, res) => {
    const store = createStore();
    // init and load data into the store
    console.log(req.path);
    // returns an array of promises
    const promises = matchRoutes(Routes, req.path).map(({ route }) => {
        return route.loadData ? route.loadData(store) : null;
    });
    
    // 还需要把这个 store 作为初始值传给 client 的 store，否则报错，两边的 html 对不上
    Promise.all(promises).then(result => {
        console.log('result: ', result);
        res.send(render(req, store));
    }).catch(err => {
        console.log(err);
    });

});

app.listen(3000, () => {
    console.log('Listening on prot 3000');
});

// todos
// follow up, after we've done the typescript learning, we could refactor this project
// with typescript!
// update babel to lastest
// react-redux v7.1 starts to support hooks, provides several hook apis, refactor later!