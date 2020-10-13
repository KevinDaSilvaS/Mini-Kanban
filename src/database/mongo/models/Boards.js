const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
});

const BoardModel = mongoose.model("Board", BoardSchema);

module.exports = BoardModel;