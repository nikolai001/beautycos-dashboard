const express = require('express');
const morgan = require("morgan");
var cors = require("cors")
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config()

// Creating express server
const app = express();

const PORT = 3000;
const HOST = "localhost";
const API_BASE_URL = process.env.API_BASE_URL;

const API_SERVICE_URL = `${API_BASE_URL}`;

app.use('/Location/GetLocations',cors(), createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    XApiKey: 'b0shazG1DpzXOpFRq9TTHHkKZOMSosUV0Jeqnly3',
    pathRewrite: {
        [`^/Location/GetLocations`]: '',
    },
}));

app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});