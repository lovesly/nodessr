import React from 'react';
import { renderToString } from 'react-dom/server';
import Home from '../client/components/Home';

export default function() {
    const content = renderToString(<Home />);
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