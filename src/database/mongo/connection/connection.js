const mongoose = require('mongoose');

const connection = async () => {
    return await mongoose.connect('mongodb://kevindasilva:123@localhost:27017/admin', 
    {useNewUrlParser: true, useUnifiedTopology: true},
    (err) => {
        if (err) {
           console.log(err); 
        }
    });
}

module.exports = connection();