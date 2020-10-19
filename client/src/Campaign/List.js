import React from 'react'
import { Button } from 'reactstrap'
import { connect } from 'react-redux'
import { getCampaigns } from '../redux/actions'
import { Route, Switch } from 'react-router-dom'
import Details from './Details'
import CreateForm from './CreateForm'
import EditForm from './EditForm'
import Preview from './Preview'
import CampaignTable from './CampaignTable'

class List extends React.Component {

  componentDidMount() {
    this.props.fetchCampaigns()
  }

  render() {
    return (
      <>
        <Switch>
          <Route exact path='/campaigns/:id/preview' render={({ match }) => {
            let id = parseInt(match.params.id)
            return <Preview id={id} />
          }} />
          <Route exact path='/campaigns/:id/edit' render={({ match }) => {
            if (this.props.campaigns) {
              let id = parseInt(match.params.id)
              let foundCampaign = this.props.campaigns.find(campaign => campaign.id === id)
              return <EditForm campaign={foundCampaign} />
            }
            return <div className="loader"></div>
          }} />
          <Route exact path='/campaigns/create' component={CreateForm} />
          <Route path='/campaigns/:id' render={({ match }) => {
            if (this.props.campaigns) {
              let id = parseInt(match.params.id)
              let foundCampaign = this.props.campaigns.find(campaign => campaign.id === id)
              return <Details campaign={foundCampaign} />
            }
            return <div className="loader"></div>
          }} />
          <Route path='/campaigns' render={() => {
            return (
              <>
                <div className="title">
                  <h1>Campaigns</h1>
                  <Button color="success" href="/campaigns/create">Create New Campaign</Button>
                </div>
                {this.props.campaigns ?
                  <CampaignTable campaigns={this.props.campaigns} />
                  :
                  <div className="loader"></div>
                }
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

export default connect(msp, mdp)(List)
