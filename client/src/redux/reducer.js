import { combineReducers } from 'redux'

const defaultState = {
  campaigns: []
}

function campaignsReducer(state = defaultState.campaigns, action) {
  switch (action.type) {
    case "get_campaigns":
      return action.payload
    default:
      return state
  }
}

const rootReducer = combineReducers({
  campaigns: campaignsReducer
})

export default rootReducer
