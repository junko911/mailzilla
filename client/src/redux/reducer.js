import { combineReducers } from 'redux'

const defaultState = {
  campaigns: null,
  currentUser: null,
  redirectTo: null,
  templates: [],
  contacts: null
}

function userReducer(state = defaultState.currentUser, action) {
  switch (action.type) {
    case "get_current_user":
      return action.payload
    case "logout":
      return null
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
      const newArray = state.filter(campaign => campaign.id !== action.payload.id)
      return [...newArray, action.payload]
    default:
      return state
  }
}

function templatesReducer(state = defaultState.templates, action) {
  switch (action.type) {
    case "get_templates":
      return action.payload
    default:
      return state
  }
}

function contactsReducer(state = defaultState.contacts, action) {
  switch (action.type) {
    case "get_contacts":
      return action.payload
    case "update_contact":
      const newArray = state.filter(contact => contact.id !== action.payload.id)
      return [...newArray, action.payload]
    case "add_contacts":
      return [state, action.payload]
    default:
      return state
  }
}

const rootReducer = combineReducers({
  campaigns: campaignsReducer,
  currentUser: userReducer,
  redirectTo: redirectReducer,
  templates: templatesReducer,
  contacts: contactsReducer
})

export default rootReducer
