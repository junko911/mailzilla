import React from 'react'
import Preview from './Preview'

const Details = ({ campaign }) => {
  return (
    <>
      {campaign ? <>
        <h1>Campaign Details</h1>
        <h4>Name: {campaign.name}</h4>
        <h4>Status: {campaign.status}</h4>
        <h4>Created At: {campaign.created_at}</h4>
        <Preview id={campaign.id} />
      </> : null}
    </>
  )
}

export default Details
