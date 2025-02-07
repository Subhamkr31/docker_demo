require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Backend Service URLs (Modify as needed)
const SERVICE_1 = process.env.SERVICE_1 || "http://localhost:4000";
const SERVICE_2 = process.env.SERVICE_2 || "http://localhost:5000";

// Middleware to log requests
app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.url}`);
    next();
});

// Proxy Requests to Microservices
app.use('/service1', createProxyMiddleware({ target: SERVICE_1, changeOrigin: true }));
app.use('/service2', createProxyMiddleware({ target: SERVICE_2, changeOrigin: true }));

// Default Route
app.get('/', (req, res) => {
    res.send('API Gateway is running...');
});

// Start the Server
app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});
