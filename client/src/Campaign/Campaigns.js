import React from 'react'
import { Table } from 'reactstrap'
import CampaignRow from './CampaignRow'
import { connect } from 'react-redux'
import { getCampaigns } from '../redux/actions'

class Campaigns extends React.Component {

  componentDidMount() {
    this.props.fetchCampaigns()
  }

  genCampaignRows = () => {
    return this.props.campaigns.map(campaign => {
      return <CampaignRow key={campaign.id} campaign={campaign} />
    })
  }

  render() {
    return (
      <>
        Campaigns
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Status</th>
              <th>Created At</th>
              <th style={{ width: "160px" }}></th>
            </tr>
          </thead>
          <tbody>
            {this.genCampaignRows()}
          </tbody>
        </Table>
      </>
    )
  }
}

const msp = state => {
  return { campaigns: state.campaigns }
}

const mdp = dispatch => {
  return { fetchCampaigns: () => dispatch(getCampaigns()) }
}

export default connect(msp, mdp)(Campaigns)
