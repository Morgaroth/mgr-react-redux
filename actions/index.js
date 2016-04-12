import * as types from "../constants/ActionTypes";
import fetch from "isomorphic-fetch";


function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + ((exdays || 356) * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}


function getUserCookie() {
    var userId = getCookie("user.id");
    if (userId == "") {
        userId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        setCookie("user.id", userId);
    }
    return userId;
}

var userLogin = {
    headers: {'X-User-Id': getUserCookie()},
    mode: 'cors'
};

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
        if (state.serverState.selected != null) {
            return fetch(state.serviceUrl + '/cpu/' + state.serverState.selected, userLogin)
                .then(response => response.json())
                .then(data => dispatch(handleCPUData(data)))
        } else {
            dispatch(handleCPUData({}))
        }
    }
}

export function executeCreateCPU(newCpuSize) {
    return (dispatch, getState) => {
        return fetch(getState().serviceUrl + '/cpu', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-User-Id': getUserCookie()
            },
            mode: 'cors',
            body: JSON.stringify({size: newCpuSize})
        }).then(response => response.json())
            .then(json => dispatch(handleNewCPU(json)))
            .then(() => dispatch(fetchSelectedCPU()));

    }
}

export function fetchCPUsFromServer() {
    return (dispatch, getState) => {
        return fetch(getState().serviceUrl + '/cpu', userLogin).then(response => response.json())
            .then(json => dispatch(refreshCPUList(json)))
            .then(() => dispatch(fetchSelectedCPU()));
    }
}

export function addGateToAlgo(gate, cpuId, qbit, position) {
    return (dispatch) => {
        dispatch({type: types.ADD_GATE_TO_ALG, gate: gate, cpuId: cpuId, qbit: qbit, position: position});
        dispatch(ensureIsMore(cpuId, position))
    }
}

export function moveNext(cpuId) {
    return {type: types.MOVE, cpuId: cpuId, delta: 1}
}

export function movePrev(cpuId) {
    return {type: types.MOVE, cpuId: cpuId, delta: -1}
}

export function reset(cpuId) {
    return {type: types.RESET, cpuId: cpuId}
}

export function addAlgoSize(cpuId) {
    return {type: types.MODIFY_ALGORITHM_LENGTH, cpuId: cpuId, delta: 1}
}

export function subAlgoSize(cpuId) {
    return {type: types.MODIFY_ALGORITHM_LENGTH, cpuId: cpuId, delta: -1}
}
export function ensureIsMore(cpuId, than) {
    return {type: types.ENSURE_ALGORITHM_LENGTH, cpuId: cpuId, than: than}
}
