import {
  FETCH_USERS,
  ADD_USERS
} from "../actionTypes/users";

export const fetchUsers = users => ({ type: FETCH_USERS, users })
export const addUsers = users => ({ type: ADD_USERS, users })