import { renderToString } from "react-dom/server";
import React from "react";

export default (html, gists) => `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Universal React Router 4 Demo</title>
        <style>
            body {
                font-family: Helvetica Neue, Arial, sans-serif;
                margin: 0;
            }
            html { box-sizing: border-box; }
            *, *:before, *:after { box-sizing: inherit; }
        </style>
    </head>
    <body>
        <div id="app">${renderToString(html)}</div>
        ${gists
          ? `
            <script>window.__gists__ = ${JSON.stringify(gists)};</script>
            <script src="/static/client.js"></script>
        `
          : ""}
    </body>
</html>`;
