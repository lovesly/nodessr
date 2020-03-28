import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
// escape characters
import serialize from 'serialize-javascript';

import Routes from '../client/Routes';

// 我有点不理解，这里为什么也要一个 router？
// 按理说，当第一次render 后，其他的工作就交给 client 的 router 了吧？？
// 这么写不报错，但是意味着 Provider 部分和 client 是一样的？？
// 只不过 store 不一样？ 我是真看不懂
export default function(req, store, context) {
    const content = renderToString(
        <Provider store={store}>
            {/* req.path 干嘛用的？ */}
            <StaticRouter location={req.path} context={context}>
                <div>{ renderRoutes(Routes) }</div>
            </StaticRouter>
        </Provider>
    );
    // 有点意思，这里 JSON.stringify 之后，页面里可以直接拿到对象而不是 string
    const html = `
        <html>
            <head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
            </head>
            <body>
                <div id="app">${content}</div>
                <script>
                    window.INITIAL_STATE = ${ serialize(store.getState()) }
                </script>
                <script src="bundle.js"></script>
            </body>
        </html>
    `;
    return html;
}