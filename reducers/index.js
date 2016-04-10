import {combineReducers} from "redux";
import * as types from "../constants/ActionTypes";
import {DefaultAlgoSize} from "../constants/defaults";

function serviceUrl(state = "http://localhost:9999", action) {
    switch (action.type) {
        case types.CHANGE_URL:
            return action.newUrl;
        default:
            return state
    }
}

function serverState(state = {available: [], selected: null}, action) {
    switch (action.type) {
        case types.SELECT_CPU:
            return Object.assign({}, state, {selected: action.id});
        case types.REFRESH_CPU_LIST:
            if (action.data.length !== 'undefined' && action.data.length > 0) {
                return {
                    available: action.data,
                    selected: action.data[0].id
                }
            } else {
                return {available: [], selected: null}
            }
        case types.HANDLE_NEW_CPU:
            return {
                available: [
                    ...state.available,
                    action.data
                ],
                selected: action.data.id
            };
        default:
            return state
    }
}

function algorithms(state = {}, action) {
    switch (action.type) {
        case types.ADD_GATE_TO_ALG:
            let obj = Object.assign({});
            if (action.gate.type != 'N') {
                obj[action.cpuId] = [
                    {
                        position: action.position,
                        gate: action.gate,
                        qbit: action.qbit
                    },
                    ...((state[action.cpuId] || []).filter((g) =>
                        g.position !== action.position || g.qbit != action.qbit
                    ))
                ];
                return Object.assign({}, state, obj);
            } else {
                obj[action.cpuId] = [
                    ...((state[action.cpuId] || []).filter((g) =>
                        g.position !== action.position || g.qbit != action.qbit
                    ))
                ];
                return Object.assign({}, state, obj);
            }
        case types.REFRESH_CPU_LIST:
            var r = Object.assign({});
            action.data.map((stillExist) => {
                r[stillExist.id] = state[stillExist.id]
            });
            return r;
        default:
            return state;
    }
}

// execution state:
// {
//     cpu_id: {
//         position: 3
//         length: 17
//     }
// }

function execution(state = {}, action) {
    var update = {};
    var actualState = state[action.cpuId] || {position: 0, length: DefaultAlgoSize};
    switch (action.type) {
        case types.ENSURE_ALGORITHM_LENGTH:
            update[action.cpuId] = Object.assign({}, actualState, {length: Math.max(1, action.than + 2, actualState.length)});
            return Object.assign({}, state, update);
        case types.MODIFY_ALGORITHM_LENGTH:
            update[action.cpuId] = Object.assign({}, actualState, {length: Math.max(1, actualState.length + action.delta)});
            return Object.assign({}, state, update);
        case types.RESET:
            update[action.cpuId] = Object.assign({}, actualState, {position: 0});
            return Object.assign({}, state, update);
        case types.MOVE:
            var newPos = Math.max(Math.min(actualState.position + action.delta, actualState.length - 1), 0);
            update[action.cpuId] = Object.assign({}, actualState, {position: newPos});
            return Object.assign({}, state, update);
        case types.REFRESH_CPU_LIST:
            var r = Object.assign({});
            action.data.map((stillExist) => {
                r[stillExist.id] = state[stillExist.id]
            });
            return r;
        default:
            return state;
    }
}

function cpuState(state = {}, action) {
    switch (action.type) {
        case types.HANDLE_CPU:
            return action.data;
        default:
            return state
    }
}

const rootReducer = combineReducers({
    serverState,
    serviceUrl,
    algorithms,
    cpuState,
    execution
});

export default rootReducer
