const mongoose = require('mongoose');
const {TO_DO} = require('../../../constants/KanbanStages');

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
        required: true,
        default: TO_DO
    },
    boardId: {
        type: String,
        required: true
    },
});

const TaskModel = mongoose.model("Task", TaskSchema);

module.exports = TaskModel;