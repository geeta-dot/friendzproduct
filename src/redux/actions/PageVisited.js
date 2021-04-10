import { ADD_VISITED, REMOVE_VISITED, FETCH_VISITED } from "../actionTypes/PageVisited";

export const addVisited = (item) => ({
    type: ADD_VISITED,
    payload: { item}
});
export const fetchVisited = () => ({
    type: FETCH_VISITED,
});

export const removeVisited = () => ({
    type: REMOVE_VISITED,
});
