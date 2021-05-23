
const execute = async (req, res, dependencies) => {
    const { 
        response, 
        Status, 
        ErrorMessages, 
        Operations,
        AmqpBroker,
        BrokerInfo,
        channel 
    } = dependencies;
    const { Tasks } = Operations;
    const { TASK_NOT_FOUND } = ErrorMessages;
    
    try {
        const { taskId } = req.params;

        const {n} = await Tasks.delete({ _id: taskId });
        if(!n || n <= 0) {
            return response(res, Status.NOT_FOUND, TASK_NOT_FOUND);
        }

        if(!channel.publish) 
            dependencies.channel = await AmqpBroker.connection();
        const {exchanges, queues} = BrokerInfo;
        await AmqpBroker.publish(
            dependencies.channel, 
            exchanges.topic_mini_kanban.exchange,
            queues.delete_all_comments_when_task_or_board_is_deleted,
            JSON.stringify({ taskId })
        );

        return response(res, Status.NO_CONTENT, undefined);
    } catch (error) {
        return response(res, Status.INTERNAL_SERVER_ERROR, error);
    }
}

module.exports = execute;