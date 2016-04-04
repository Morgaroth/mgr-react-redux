import * as types from "../constants/ActionTypes";
import fetch from "isomorphic-fetch";


export function createCPU(size) {
    return {type: types.CREATE_CPU, size}
}

export function deleteCPU(id) {
    return {type: types.DELETE_CPU, id}
}

export function selectCPU(id) {
    return {type: types.SELECT_CPU, id}
}

export function refreshCPUList() {
    return {type: types.REFRESH_CPU_LIST}
}

export function changeServiceURL(serviceURL) {
    return {type: types.CHANGE_URL, newUrl: serviceURL}
}

export function handleNewCPU(json) {
    return {
        type: types.HANDLE_NEW_CPU, data: json
    }
}

export function handleCPUData(json) {
    return {
        type: types.HANDLE_CPU, data: json
    }
}

export function fetchSelectedCPU() {
    return (dispatch, getState) => {
        let state = getState();
        console.log("fetchSelectedCPU: state is " + JSON.stringify(state));
        return fetch(state.serviceUrl + '/cpu/' + state.machineState.selected).then(response => response.json())
            .then(json => dispatch(handleCPUData(json)))
    }
}

export function executeCreateCPU(newCpuSize) {
    return (dispatch, getState) => {
        return fetch(getState().serviceUrl + '/cpu', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({size: newCpuSize})
        }).then(response => response.json())
            .then(json =>dispatch(handleNewCPU(json)))
            .then(() => dispatch(fetchSelectedCPU()));

    }
}

export function addGateToAlgo(gate, cpuId, qbit, position) {
    return {type: types.ADD_GATE_TO_ALG, gate: gate, cpuId: cpuId, qbit: qbit, position: position}
}