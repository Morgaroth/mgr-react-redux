import {combineReducers} from "redux";
import * as types from "../constants/ActionTypes";

function serviceUrl(state = "http://localhost:9999", action) {
    switch (action.type) {
        case types.CHANGE_URL:
            return action.newUrl;
        default:
            return state
    }
}

function machineState(state = {cpus: [], selected: null}, action) {
    switch (action.type) {
        case types.SELECT_CPU:
            return Object.assign({}, state, {selected: action.id});
        case types.HANDLE_NEW_CPU:
            return {
                cpus: [
                    ...state.cpus,
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
    machineState,
    serviceUrl,
    algorithms,
    cpuState
});

export default rootReducer
