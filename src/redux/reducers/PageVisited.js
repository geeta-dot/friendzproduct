import { ADD_VISITED, REMOVE_VISITED, FETCH_VISITED } from "../actionTypes/PageVisited";

let initialState = [];

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_VISITED:
            console.log(arr, action.payload.item)
            let arr = state
            if (action.payload.item) {
                arr = state.push(action.payload.item)
            }
            return arr;

        case REMOVE_VISITED:
            let arr2 = state
            if (action.payload.item) {
                arr2 = state.pop(action.payload.item)
            }
            return arr2;

        default:
            return initialState;
    }
}
