const express = require('express');
var cors = require("cors")
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config()

// Creating express server
const app = express();

const PORT = 3000;
const HOST = "localhost";

app.use('/Location/GetLocations',cors(), createProxyMiddleware({
    target: "https://alarm-dev.beautycos.dk/Api/Location/GetLocations",
    changeOrigin: true,
    XApiKey: 'b0shazG1DpzXOpFRq9TTHHkKZOMSosUV0Jeqnly3',
    pathRewrite: {
        [`^/Location/GetLocations`]: '',
    },
}));

app.use('/Location/GetUtcNow',cors(), createProxyMiddleware({
    target: "https://alarm-dev.beautycos.dk/Api/Location/GetUtcNow",
    changeOrigin: true,
    XApiKey: 'b0shazG1DpzXOpFRq9TTHHkKZOMSosUV0Jeqnly3',
    pathRewrite: {
        [`^/Location/GetUtcNow`]: '',
    },
}));

app.use('/Location/LongPull',cors(), createProxyMiddleware({
    target: "https://alarm-dev.beautycos.dk/Api/Location/LongPull",
    changeOrigin: true,
    XApiKey: 'b0shazG1DpzXOpFRq9TTHHkKZOMSosUV0Jeqnly3',
    pathRewrite: {
        [`^/Location/LongPull`]: '',
    },
}));

app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});