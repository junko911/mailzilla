import React from 'react'
import { connect } from 'react-redux'

const Preview = props => {
  let foundCampaign = props.campaigns.find(campaign => campaign.id === props.id)
  return (
    <>
      {
        foundCampaign ?
          <>
            {
              foundCampaign.content ?
                <>
                  <h1>Preview</h1>
                  <div
                    dangerouslySetInnerHTML={{ __html: foundCampaign.content }}
                    style={{ border: "1px solid #ced4da" }}
                  ></div>
                </>
                : <div>No content</div>
            }
          </>
          : null
      }
    </>
  )
}

const msp = state => {
  return { campaigns: state.campaigns }
}

export default connect(msp)(Preview)
