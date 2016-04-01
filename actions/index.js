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
    return {type: types.HANDLE_NEW_CPU, data: json}
}

export function executeCreateCPU(url, newCpuSize) {

    // Thunk middleware knows how to handle functions.
    // It passes the dispatch method as an argument to the function,
    // thus making it able to dispatch actions itself.

    return (dispatch) => {

        // First dispatch: the app state is updated to inform
        // that the API call is starting.

        // dispatch(requestPosts(subreddit))

        // The function called by the thunk middleware can return a value,
        // that is passed on as the return value of the dispatch method.

        // In this case, we return a promise to wait for.
        // This is not required by thunk middleware, but it is convenient for us.

        return fetch(url + '/cpu', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({size: newCpuSize})
        }).then(response => response.json())
            .then(json => {
                    // We can dispatch many times!
                    // Here, we update the app state with the results of the API call.
                    dispatch(handleNewCPU(json));
                }
            );

        // In a real world app, you also want to
        // catch any error in the network call.
    }
}