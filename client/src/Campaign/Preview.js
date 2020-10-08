import React from 'react'

const Preview = ({ campaign }) => {
  return (
    <>
      <h1>Preview</h1>
      <div>{campaign.content}</div>
    </>
  )
}

export default Preview
