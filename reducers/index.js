import {combineReducers} from 'redux'
import {CHANGE_URL, HANDLE_NEW_CPU, SELECT_CPU} from '../constants/ActionTypes'


function serviceUrl(state = "http://localhost:9999", action) {
    switch (action.type) {
        case CHANGE_URL:
            return action.newUrl;
        default:
            return state
    }
}

function machineState(state = {cpus: [], selected: null}, action) {
    switch (action.type) {
        case SELECT_CPU:
            return Object.assign({}, state, {selected: action.id});
        case HANDLE_NEW_CPU:
            return {
                cpus: [
                    action.data,
                    ...state.cpus
                ],
                selected: action.data.id
            };
        default:
            return state
    }
}
//
// function posts(state = {isFetching: false, didInvalidate: false, items: []}, action) {
//     switch (action.type) {
//         case INVALIDATE_REDDIT:
//             return Object.assign({}, state, {
//                 didInvalidate: true
//             })
//         case REQUEST_POSTS:
//             return Object.assign({}, state, {
//                 isFetching: true,
//                 didInvalidate: false
//             })
//         case RECEIVE_POSTS:
//             return Object.assign({}, state, {
//                 isFetching: false,
//                 didInvalidate: false,
//                 items: action.posts,
//                 lastUpdated: action.receivedAt
//             })
//         default:
//             return state
//     }
// }
//
// function postsByReddit(state = {}, action) {
//     switch (action.type) {
//         case INVALIDATE_REDDIT:
//         case RECEIVE_POSTS:
//         case REQUEST_POSTS:
//             return Object.assign({}, state, {
//                 [action.reddit]: posts(state[action.reddit], action)
//             })
//         default:
//             return state
//     }
// }

const rootReducer = combineReducers({
    machineState,
    serviceUrl
})

export default rootReducer
