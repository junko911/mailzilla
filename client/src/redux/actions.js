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
  console.log("=== REDIRECT ACTION DISPATCHED ===");
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
        console.log("created!")
        dispatch({ type: "create_campaign", payload: data })
        dispatch({ type: "redirect", payload: `/campaigns/create/${data.id}` });
        // this.props.history.push(`/campaigns/create/${data.id}`)
        // const innerOptions = {
        //   method: 'PATCH',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Accepts': 'application/json'
        //   },
        //   body: JSON.stringify({
        //     status: 2
        //   })
        // }
        // fetch(`http://localhost:3000/api/v1/campaigns/${data.id}/send_test`, innerOptions)
        //   .then(res => res.json())
        //   .then(data => console.log("sent!"))
      })
  }
}

export const updateCampaign = content => {
  return function (dispatch, getState) {
    console.log(getState().campaigns)
    const foundCampaign = getState().campaigns.find(campaign => campaign.id === 21)
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
  }
}
