import {combineReducers} from "redux";
import * as T from "../constants/ActionTypes";

function serviceUrl(state = "http://localhost:9999", action) {
    switch (action.type) {
        case T.CHANGE_URL:
            return action.newUrl;
        default:
            return state
    }
}

function machineState(state = {cpus: [], selected: null}, action) {
    switch (action.type) {
        case T.SELECT_CPU:
            return Object.assign({}, state, {selected: action.id});
        case T.HANDLE_NEW_CPU:
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

function algorithms(state = {}, action) {
    switch (action.type) {
        case T.ADD_GATE_TO_ALG:
            let obj = Object.assign({});
            obj[action.cpuId] = [
                {
                    position: action.position,
                    gate: action.gate,
                    qbit: action.qbit
                },
                ...(state[action.cpuId].filter((g) =>
                    g.position !== action.position || g.qbit != action.qbit
                ))
            ];
            return Object.assign({}, state, obj);
        default:
            return state;
    }
}

function cpuState(state = {}, action) {
    switch (action.type) {
        case T.HANDLE_CPU:
            return action.data;
        default:
            return state
    }
}

const rootReducer = combineReducers({
    machineState,
    serviceUrl,
    algorithms,
    cpuState
});

export default rootReducer
