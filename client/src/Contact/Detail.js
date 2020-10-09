import React from 'react'

const Detail = ({ contact }) => {
  return (
    <>
      {contact ? <>
        <h1>Contact Details</h1>
        <h4>Name: {contact.name}</h4>
        <h4>Status: {contact.status}</h4>
        <h4>Created At: {contact.created_at}</h4>
      </> : null}
    </>
  )
}

export default Detail
