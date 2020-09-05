export function setRequests(requests) {
    return {
        type: "SET_REQUESTS",
        payload: {
            requests: requests
        }
    }
}

export function setMessageIndicator(data) {
    return {
        type: "SET_MESSAGE_INDICATOR",
        payload: {
            data
        }
    }
}
