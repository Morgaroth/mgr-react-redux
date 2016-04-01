import {combineReducers} from 'redux'
import {CHANGE_URL, CREATE_CPU} from '../constants/ActionTypes'


function serviceUrl(state = "http://localhost:8080", action) {
    switch (action.type) {
        case CHANGE_URL:
            return action.newUrl;
        default:
            return state
    }
}

function selectedReddit(state = 'reactjs', action) {
    switch (action.type) {
        case CREATE_CPU:
            return action.reddit;
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
    selectedReddit,
    serviceUrl
})

export default rootReducer
