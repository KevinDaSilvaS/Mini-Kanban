const app = require('../../src/app');
require('../../src/app/createRoutes');

const routes = app._router.stack          
  .filter(routeObject => routeObject.route)  
  .map(routeObject => {
    const { path, stack } = routeObject.route;
    const [ method ] = stack.map(layer => layer.method);
    return { path, method };
});

test('Should assert all routes and methods on microservice', () => {
    expect(routes).toEqual([
        { path: '/boards', method: 'get' },
        { path: '/boards', method: 'post' },
        { path: '/boards/:boardId', method: 'delete' },
        { path: '/boards/:boardId', method: 'patch' },
        { path: '/boards/:boardId', method: 'get' },
        { path: '/tasks/:boardId', method: 'get' },
        { path: '/tasks/:boardId', method: 'post' },
        { path: '/tasks/:taskId', method: 'delete' },
        { path: '/tasks/:taskId', method: 'patch' },
        { path: '/tasks/:boardId/:taskId', method: 'get' }
      ]);
});