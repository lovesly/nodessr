import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { renderRoutes } from 'react-router-config';

import Routes from '../client/Routes';

// 我有点不理解，这里为什么也要一个 router？
// 按理说，当第一次render 后，其他的工作就交给 client 的 router 了吧？？
// 这么写不报错，但是意味着 Provider 部分和 client 是一样的？？
// 只不过 store 不一样？ 我是真看不懂
export default function(req, store) {
    const content = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.path} context={{}}>
                <div>{ renderRoutes(Routes) }</div>
            </StaticRouter>
        </Provider>
    );
    const html = `
        <html>
            <head></head>
            <body>
                <div id="app">${content}</div>
                <script src="bundle.js"></script>
            </body>
        </html>
    `;
    return html;
}