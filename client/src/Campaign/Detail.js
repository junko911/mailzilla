import React from 'react'

const Detail = ({ campaign }) => {
  let details
  if (campaign) {
    details = (
      <>
        <h1>Campaign Details</h1>
        <h4>Name: {campaign.name}</h4>
        <h4>Status: {campaign.status}</h4>
        <h4>Created At: {campaign.created_at}</h4>
      </>
    )
  } else {
    details = null
  }
  
  return (
    <>
      {details}
    </>
  )
}

export default Detail
