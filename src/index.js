// import here? why can't we setup in webpack?
import express from 'express';
import { matchRoutes } from 'react-router-config';
import proxy from 'express-http-proxy';
import render from './helpers/render';
import createStore from './helpers/createStore';
import Routes from './client/Routes';

const app = express();

// 如果 heroku 太慢，我想部署在本地呢？
app.use('/api', proxy('https://react-ssr-api.herokuapp.com', {
    proxyReqOptDecorator(opts) {
        opts.headers['x-forwarded-host'] = 'localhost:3000';
        return opts;
    }
}));

// redirect to another place to login?
// If I create an OAuth server, we could handle the authentication process all by ourselves right??
// 暂时先这样，登录本身并不是 SSR 的一部分。
// 后续研究一下，接入 github，或者 腾讯qq？，或者自己搭建一个 oAuth 服务？部署在另一个端口?
app.use('/zauth', ()=> {
    console.log('Handle auth by ourselves')
});
// interesting
app.use(express.static('public'));

app.get('*', (req, res) => {
    const store = createStore(req);
    // init and load data into the store
    console.log('path: ', req.path);
    // returns an array of promises
    const promises = matchRoutes(Routes, req.path).map(({ route }) => {
        return route.loadData ? route.loadData(store) : null;
    });
    
    // 还需要把这个 store 作为初始值传给 client 的 store，否则报错，两边的 html 对不上
    Promise.all(promises).then(result => {
        const context = {};
        // 这个背后肯定发生了什么，是 StaticRouter 背后做了什么工作吗？让 staticContext 的改变，放入了 context 里
        const content = render(req, store, context);
        console.log('=======================', context);
        if (context.notFound) {
            res.status(404);
        }
        res.send(content);
    }).catch(err => {
        console.log('error: ', err);
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

/**
 * 有个问题，初次的时候，渲染的是服务端给的 string，然后服务端的 store 也挂在 window 上传给 client 端作为 store 的初始值
 * 那么然后呢？什么时候 client 开始接管？渲染的内容变成 client 的东西呢？ 此时 服务端 的 store 之类的，哪些就不要了可以回收，哪些仍然在运行呢？
 * 是说初始页面里，把 bundle.js 加载完，就开始由 bundle 里的 client 端代码接管？ 这里肯定还发生了点什么。为什么 html 不符 还会出问题，说明后面还是有些校验之类的东西。
 */

/**
 * 这个课有个不好的地方，就是依赖线上服务。这部分东西对外部是未知的。不搭梯子，用不了 google 就没办法。
 */