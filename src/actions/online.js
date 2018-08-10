import { SET_ONLINE_USERS, SET_OFFLINE_USER, INIT_ONLINE_USERS } from './types'

export const setOnline = (users) => {
  return dispatch => {
    dispatch({
      type: SET_ONLINE_USERS,
      payload: users
    })
  }
}

export const setOffline = (user) => {
  return {
    type: SET_OFFLINE_USER,
    payload: user
  }
}

export const initOnlineUsers = (users) => {
  return {
    type: INIT_ONLINE_USERS,
    payload: users
  }
}