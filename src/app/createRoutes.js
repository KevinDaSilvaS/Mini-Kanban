const app = require('./index');
const routes = require('../routes/routes');
const GetMethod = require('./methods/GetMethod');
const PostMethod = require('./methods/PostMethod');
const PatchMethod = require('./methods/PatchMethod');
const DeleteMethod = require('./methods/DeleteMethod');

routes.map((route) => {
    switch (route.method) {
        case 'GET':
            new GetMethod().getRoute(app, route);
            break;
        
        case 'POST':
            new PostMethod().getRoute(app, route);
            break;

        case 'PATCH':
            new PatchMethod().getRoute(app, route);
            break;

        case 'DELETE':
            new DeleteMethod().getRoute(app, route);
            break;
    }
});


