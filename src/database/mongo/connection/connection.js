const mongoose = require('mongoose');

const connection = async () => {
    //in local mode change mongo to localhost
    return await mongoose.connect('mongodb://kevindasilva:123@mongo:27017/admin', 
    {useNewUrlParser: true, useUnifiedTopology: true},
    (err) => {
        if (err) {
           console.log(err); 
        }
    });
}

module.exports = connection();