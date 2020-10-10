export const getCurrentUser = id => {
  return function (dispatch) {
    fetch(`http://localhost:3000/api/v1/users/${id}`)
      .then(res => res.json())
      .then(data => dispatch({ type: "get_current_user", payload: data }))
  }
}

export const getCampaigns = () => {
  return function (dispatch) {
    fetch("http://localhost:3000/api/v1/campaigns")
      .then(res => res.json())
      .then(data => dispatch({ type: "get_campaigns", payload: data }))
  }
}

export const redirect = link => {
  return { type: "redirect", payload: link };
};

export const createCampaign = campaignObj => {
  return function (dispatch) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify({
        campaign: campaignObj
      })
    }
    return fetch("http://localhost:3000/api/v1/campaigns", options)
      .then(res => res.json())
      .then(data => {
        dispatch({ type: "create_campaign", payload: data })
        dispatch({ type: "redirect", payload: `/campaigns/${data.id}/edit` });
      })
  }
}

export const updateCampaign = (id, content) => {
  return function (dispatch, getState) {
    const foundCampaign = getState().campaigns.find(campaign => campaign.id === id)
    foundCampaign.content = content
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify({
        campaign: foundCampaign
      })
    }
    return fetch(`http://localhost:3000/api/v1/campaigns/${id}`, options)
      .then(res => res.json())
      .then(data => {
        dispatch({ type: "redirect", payload: `/campaigns/${data.id}/preview` });
      })
  }
}

export const getTemplates = () => {
  return function (dispatch) {
    fetch("http://localhost:3000/api/v1/campaigns/templates")
      .then(res => res.json())
      .then(data => dispatch({ type: "get_templates", payload: data }))
  }
}

export const getContacts = () => {
  return function (dispatch) {
    fetch("http://localhost:3000/api/v1/contacts")
      .then(res => res.json())
      .then(data => dispatch({ type: "get_contacts", payload: data }))
  }
}

export const updateContact = segmentObj => {
  return function (dispatch) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify({
        segment: segmentObj
      })
    }
    fetch("http://localhost:3000/api/v1/segments", options)
      .then(res => res.json())
      .then(data => {
        
      })
  }
}
