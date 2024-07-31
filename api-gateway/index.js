const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware')
require('dotenv').config();


const app = express();

const routes = {
    '/user':process.env.USER_API,
    '/admin-service': process.env.ADMIN_API,
    '/application-service': process.env.APPLICATION_API,
    '/company-service':process.env.COMPANY_API,
    '/job service': process.env.JOB_API,
    '/notification-service':process.env.NOTIFICATION_API,
    '/post-service': process.env.POST_API,
}


for(const route in routes){
    const target = routes[route];
    app.use(route,createProxyMiddleware({target}))}

app.listen(process.env.PORT, () => {
  console.log('API Gateway running on port 4000');
});
