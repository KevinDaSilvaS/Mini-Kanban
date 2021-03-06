require('dotenv/config');
const mongoose = require('mongoose');

const {MONGO_USER, MONGO_PASSWORD, MONGO_INITDB_DATABASE} = process.env;

const connection = async () => {
    //in local mode change mongo to localhost
    return await mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@mongo:27017/${MONGO_INITDB_DATABASE}`, 
    {useNewUrlParser: true, useUnifiedTopology: true},
    (err) => {
        if (err) {
           console.log(err); 
        }
    });
}

module.exports = connection();