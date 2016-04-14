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

export function checkIfIsControlledStep(gates, position = null) {
    if (position == undefined || position == null) {
        return gates.filter(x => x.gate.type == 'C').length > 0;
    }
    return gatesAtPosition(gates, position).filter(x => x.gate.type == 'C').length > 0;
}
const SpecialGates = ['C', 'Cross'];

export function gatesAtPosition(gates, position) {
    return gates.filter(x => x.position == position);
}
export function findNormalGatesHere(gates, position = null) {
    if (position != undefined && position != null) {
        gates = gatesAtPosition(gates, position)
    }
    return gates.filter(x =>SpecialGates.indexOf(x.gate.type) < 0)
}
export function findControlledGatesHere(gates, position = null) {
    if (position != undefined && position != null) {
        gates = gatesAtPosition(gates, position)
    }
    return gates.filter(x =>x.gate.type == 'C')
}
function findGatesHere(gateType, position, gates) {
    var onThisPosition = gates.filter(x => x.position == position);
    return onThisPosition.find(x =>gateType == x.gate.type);
}

function countNormalGates(gates, position) {
    return findNormalGatesHere(gates, position).length
}
function gateAt(position, qbit, gates) {
    return gates.find(x => x.position == position && x.qbit == qbit)
}
// function checkIfIsControlledStep(gates, position){
//     var onThisPosition = gates.filter(x => x.position == position);
//     return onThisPosition.find(x => x.type == 'C') != undefined
// }
// function checkIfIsControlledStep(gates, position){
//     var onThisPosition = gates.filter(x => x.position == position);
//     return onThisPosition.find(x => x.type == 'C') != undefined
// }
function addDirectionsTo(gate, toUp, toDown) {
    return Object.assign({}, gate, {
        gate: Object.assign({}, gate.gate, {isToUp: toUp, isToDown: toDown})
    });
}
function upperizeGate(gate) {
    return addDirectionsTo(gate, true, false)
}
function downizeGate(gate) {
    return addDirectionsTo(gate, false, true)
}
function betwenizeGate(gate) {
    return addDirectionsTo(gate, true, true)
}
function disableDirection(gate) {
    return addDirectionsTo(gate, false, false)
}

function algorithms(state = {}, action) {
    switch (action.type) {
        case types.ADD_GATE_TO_ALG:
            let obj = Object.assign({});
            var thisStateGates = state[action.cpuId] || [];
            switch (action.gate.type) {
                case 'C':
                    const normalGates = findNormalGatesHere(thisStateGates, action.position);
                    const normalGatesCnt = normalGates.length;
                    console.log("normal gates are", JSON.stringify(normalGates));
                    if (normalGatesCnt < 1) {
                        // missing target gate for control
                        console.log("put normal gate first!");
                        return state
                    } else if (normalGatesCnt > 1) {
                        // to much gates for control
                        console.log("too much target gates");
                        return state
                    } else if (normalGates[0].qbit == action.qbit) {
                        console.log("overriding is disabled");
                        return state
                    } else {
                        var newGates = [];
                        var localGates = gatesAtPosition(thisStateGates, action.position).filter(x => x.gate.type != "Cross");
                        localGates.push({
                            position: action.position,
                            qbit: action.qbit,
                            gate: {
                                type: 'C'
                            }
                        });

                        var localGatesQbits = localGates.map(x => x.qbit);
                        const minQ = Math.min.apply(Math, localGatesQbits);
                        const maxQ = Math.max.apply(Math, localGatesQbits);
                        for (var i = minQ + 1; i < maxQ; ++i) {
                            const thisGate = gateAt(action.position, i, localGates);
                            if (thisGate == undefined) {
                                newGates.push({
                                    qbit: i,
                                    position: action.position,
                                    gate: {
                                        type: 'Cross'
                                    }
                                })
                            } else if (thisGate.gate.type == "Cross") {
                                newGates.push(thisGate)
                            } else {
                                newGates.push(betwenizeGate(thisGate))
                            }
                        }
                        var gateToUpp = gateAt(action.position, minQ, localGates);
                        newGates.push(upperizeGate(gateToUpp));
                        var gateToDown = gateAt(action.position, maxQ, localGates);
                        newGates.push(downizeGate(gateToDown));
                        obj[action.cpuId] = [
                            ...newGates,
                            ...((thisStateGates).filter(g =>
                                g.position !== action.position
                            ))
                        ];
                        return Object.assign({}, state, obj);
                    }
                case 'N':
                    if (!checkIfIsControlledStep(thisStateGates, action.position)) {
                        obj[action.cpuId] = [
                            ...((thisStateGates).filter((g) =>
                                g.position !== action.position || g.qbit != action.qbit
                            ))
                        ];
                        return Object.assign({}, state, obj);
                    } else {
                        var newGates = [];
                        var gatesToFilter = gatesAtPosition(thisStateGates, action.position);
                        for (var i = 0; i < gatesToFilter.length; ++i) {
                            var g = gatesToFilter[i];
                            if (SpecialGates.indexOf(g.gate.type) < 0) {
                                console.log(g.gate.qbit, action.qbit, g.gate.qbit != action.qbit)
                                if (g.qbit != action.qbit) {
                                    newGates.push(disableDirection(g))
                                }
                            }
                        }
                        obj[action.cpuId] = [
                            ...newGates,
                            ...(thisStateGates).filter(r => r.position !== action.position)
                        ];
                        return Object.assign({}, state, obj);

                    }
                default:
                    if (!checkIfIsControlledStep(thisStateGates, action.position)) {
                        // todo when putting another gate check if there is controlled gate on another place
                        obj[action.cpuId] = [
                            {
                                position: action.position,
                                gate: action.gate,
                                qbit: action.qbit
                            },
                            ...((thisStateGates).filter((g) =>
                                g.position !== action.position || g.qbit != action.qbit
                            ))
                        ];
                        return Object.assign({}, state, obj);
                    } else {
                        console.log("cannot drag normal gate when there is controlled step")
                        return state;
                    }
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
