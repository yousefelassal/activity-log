type State = {
    isLive: boolean;
    since: Date | null;
}

type Action = 
    | { type: 'TOGGLE_LIVE', payload: boolean }

export const initialLiveState: State = {
    isLive: false,
    since: null
}

const liveReducer = (state: State = initialLiveState, action: Action): State => {
    switch (action.type) {
        case 'TOGGLE_LIVE':
            return {
                ...state,
                isLive: action.payload,
                since: action.payload ? new Date() : null
            }
        default:
            return state;
    }
}

export default liveReducer;
