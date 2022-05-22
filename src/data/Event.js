class Event {
    // Todo: not working, map to plain object?
    constructor(type, startTime = null) {
        return {
            type: type,
            startTime: startTime ?? Date()
        }
    }
}

export default Event;
