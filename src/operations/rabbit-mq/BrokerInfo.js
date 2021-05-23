const exchanges = {
    topic_mini_kanban: {
        exchange: 'topic-Mini-Kanban',
        type: 'topic', 
        config: {
            durable: true
        }
    }
}

const queues = {
    delete_all_comments_when_task_or_board_is_deleted: 'com.comments-service-delete-all-comments-when-task-or-board-is-deleted'
}

module.exports = {
    exchanges,
    queues
}