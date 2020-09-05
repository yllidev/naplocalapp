const initialState = { 
    requests: [],
    messageIndicator: false
}

export function reducer(state = initialState, action) {
    switch (action.type) {
        case "SET_REQUESTS":
            return {
                ...state,
                requests: action.payload.requests
            }
        case "SET_MESSAGE_INDICATOR":
            return {
                ...state,
                messageIndicator: action.payload.data
            }
       default:
           return state;
        }
} 