import React from 'react'
import { Table } from 'reactstrap'
import CampaignRow from './CampaignRow'
import { connect } from 'react-redux'
import { getCampaigns } from '../redux/actions'
import { Route, Switch } from 'react-router-dom'
import CampaignDetail from './CampaignDetails'

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
        <Switch>
          <Route path='/campaigns/:id' render={({ match }) => {
            let id = parseInt(match.params.id)
            let foundCampaign = this.props.campaigns.find(campaign => campaign.id === id)
            return <CampaignDetail campaign={foundCampaign} />
          }} />
          <Route path='/campaigns' render={() => {
            return (
              <>
                <h1>Campaigns</h1>
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
          }} />
        </Switch>
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
