require('dotenv/config');
const connectionMongo = require('../database/mongo/connection/connection');
connectionMongo.then().catch(e => new Error(e));

const app = require('./index');
const port = process.env.PORT || 1747;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});