import React from 'react'

const Detail = ({ campaign }) => {
  return (
    <>
      {campaign ? <>
        <h1>Campaign Details</h1>
        <h4>Name: {campaign.name}</h4>
        <h4>Status: {campaign.status}</h4>
        <h4>Created At: {campaign.created_at}</h4>
      </> : null}
    </>
  )
}

export default Detail
