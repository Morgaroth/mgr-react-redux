import * as types from "../constants/ActionTypes";

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
    console.log("calling " + serviceURL);
    return {type: types.CHANGE_URL, newUrl: serviceURL}
}