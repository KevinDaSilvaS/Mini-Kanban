const GetMethod = require('./GetMethod');
const PostMethod = require('./PostMethod');
const PatchMethod = require('./PatchMethod');
const DeleteMethod = require('./DeleteMethod');

module.exports = {
    GET: new GetMethod().getRoute,
    POST: new PostMethod().getRoute,
    PATCH: new PatchMethod().getRoute,
    DELETE: new DeleteMethod().getRoute
}