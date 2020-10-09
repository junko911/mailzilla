import { combineReducers } from 'redux'

const defaultState = {
  campaigns: [],
  currentUser: {},
  redirectTo: null,
  templates: []
}

function userReducer(state = defaultState.currentUser, action) {
  switch (action.type) {
    case "get_current_user":
      return action.payload
    default:
      return state
  }
}

function redirectReducer(state = defaultState.redirectTo, action) {
  switch (action.type) {
    case "redirect":
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
    case "update_campaign":
      return state
    default:
      return state
  }
}

function templatesReducer(state=defaultState.templates, action) {
  switch (action.type) {
    case "get_templates":
      return action.payload
    default:
      return state
  }
}

const rootReducer = combineReducers({
  campaigns: campaignsReducer,
  currentUser: userReducer,
  redirectTo: redirectReducer,
  templates: templatesReducer
})

export default rootReducer
