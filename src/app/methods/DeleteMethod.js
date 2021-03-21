const HttpMethodBase = require("./HttpMethodBase");

class DeleteMethod extends HttpMethodBase {

    getRoute(app, route) {
        return app.delete(route.route, async (req, res) => {
            const values = Object.values(route.validations);
            for (let i = 0; i < values.length; i++) {
                await values[i](req, res);
            }

            await route.controller(req, res);
        });
    }
}

module.exports = DeleteMethod;