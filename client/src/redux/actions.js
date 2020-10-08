export const getCampaigns = () => {
  return function (dispatch) {
    fetch("http://localhost:3000/api/v1/campaigns")
      .then(res => res.json())
      .then(data => dispatch({ type: "get_campaigns", payload: data }))
  }
}

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
    fetch("http://localhost:3000/api/v1/campaigns", options)
      .then(res => res.json())
      .then(data => {
        dispatch({ type: "create_campaign", payload: data })
        const innerOptions = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Accepts': 'application/json'
          },
          body: JSON.stringify({
            status: 2
          })
        }
        fetch(`http://localhost:3000/api/v1/campaigns/${data.id}/send_test`, innerOptions)
          .then(res => res.json())
          .then(data => console.log("sent!"))
      })
  }
}

