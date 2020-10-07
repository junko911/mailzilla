export const getCampaigns = () => {
  return function (dispatch) {
    fetch("http://localhost:3000/api/v1/campaigns")
      .then(res => res.json())
      .then(data => dispatch({ type: "get_campaigns", payload: data }))
  }
}
