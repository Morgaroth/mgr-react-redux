import * as types from "../constants/ActionTypes";
import fetch from "isomorphic-fetch";


export function createCPU(size) {
    return {type: types.CREATE_CPU, size}
}

export function deleteCPU(id) {
    return {type: types.DELETE_CPU, id}
}

export function selectCPU(id) {
    return (dispatch) => {
        dispatch({type: types.SELECT_CPU, id});
        dispatch(fetchSelectedCPU())
    }
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

export function refreshCPUList(json) {
    return {
        type: types.REFRESH_CPU_LIST, data: json
    }
}

export function fetchSelectedCPU() {
    return (dispatch, getState) => {
        let state = getState();
        // console.log("fetchSelectedCPU: state is " + JSON.stringify(state));
        return fetch(state.serviceUrl + '/cpu/' + state.serverState.selected).then(response => response.json())
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
            .then(json => dispatch(handleNewCPU(json)))
            .then(() => dispatch(fetchSelectedCPU()));

    }
}

export function fetchCPUsFromServer() {
    return (dispatch, getState) => {
        return fetch(getState().serviceUrl + '/cpu').then(response => response.json())
            .then(json => dispatch(refreshCPUList(json)))
            .then(() => dispatch(fetchSelectedCPU()));

    }
}

export function addGateToAlgo(gate, cpuId, qbit, position) {
    return {type: types.ADD_GATE_TO_ALG, gate: gate, cpuId: cpuId, qbit: qbit, position: position}
}