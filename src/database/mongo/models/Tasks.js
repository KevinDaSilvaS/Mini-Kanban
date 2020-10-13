const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    boardId: {
        type: String,
        required: true
    },
});

const TaskModel = mongoose.model("Task", TaskSchema);

module.exports = TaskModel;