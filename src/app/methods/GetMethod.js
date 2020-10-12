const HttpMethodBase = require("./HttpMethodBase");

class GetMethod extends HttpMethodBase {

    getRoute(app, route) {
        return app.get(route.route, async (req, res) => {
            const values = Object.values(route.validations);
            values.map = async (validation) => {
                await validation(req, res);
            }

            await route.controller(req, res);
        });
    }
}

module.exports = GetMethod;