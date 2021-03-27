const app = require('./index');
const routes = require('../routes/routes');
const HttpMethods = require('./methods/');

routes.map((route) => {
    HttpMethods[route.method](app, route);
});