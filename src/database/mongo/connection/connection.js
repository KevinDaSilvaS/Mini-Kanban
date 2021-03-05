require('dotenv/config');
const mongoose = require('mongoose');

const {MONGO_USER, MONGO_PASSWORD} = process.env;

const connection = async () => {
    //in local mode change mongo to localhost
    return await mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@mongo:27017/admin`, 
    {useNewUrlParser: true, useUnifiedTopology: true},
    (err) => {
        if (err) {
           console.log(err); 
        }
    });
}

module.exports = connection();