import { combineReducers } from 'redux'

const defaultState = {
  campaigns: [],
  currentUser: {}
}

function userReducer(state = defaultState.currentUser, action) {
  switch (action.type) {
    case "get_current_user":
      return action.payload
    default:
      return state
  }
}

function campaignsReducer(state = defaultState.campaigns, action) {
  switch (action.type) {
    case "get_campaigns":
      return action.payload
    case "create_campaign":
      return [...state, action.payload]
    default:
      return state
  }
}

const rootReducer = combineReducers({
  campaigns: campaignsReducer,
  currentUser: userReducer
})

export default rootReducer
