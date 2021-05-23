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
    const { Boards, Tasks } = Operations;
    const { BOARD_NOT_FOUND } = ErrorMessages;

    try {
        const { boardId } = req.params;
        await Tasks.delete({ boardId });

        const {n} = await Boards.delete({ _id: boardId });
        if(!n || n <= 0) {
            return response(res, Status.NOT_FOUND, BOARD_NOT_FOUND);
        }

        const {exchanges, queues} = BrokerInfo;
        await AmqpBroker.publish(
            channel, 
            exchanges.topic_mini_kanban.exchange,
            queues.delete_all_comments_when_task_or_board_is_deleted,
            JSON.stringify({ boardId })
        );

        return response(res, Status.NO_CONTENT, undefined);
    } catch (error) {
        return response(res, Status.INTERNAL_SERVER_ERROR, error);
    }
}

module.exports = execute;