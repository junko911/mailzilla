import React from 'react'
import { Button } from 'reactstrap'
import { connect } from 'react-redux'
import { getCampaigns, getTemplates } from '../redux/actions'
import { Route, Switch } from 'react-router-dom'
import Details from './Details'
import CreateForm from './CreateForm'
import EditForm from './EditForm'
import Preview from './Preview'
import CampaignTable from './CampaignTable'

class List extends React.Component {

  componentDidMount() {
    this.props.fetchCampaigns()
    this.props.fetchTemplates()
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
            return <div>Loading...</div>
          }} />
          <Route exact path='/campaigns/create' render={() => {
            if (this.props.templates) {
              return <CreateForm />
            }
            return <div>Loading...</div>
          }} />
          <Route path='/campaigns/:id' render={({ match }) => {
            if (this.props.campaigns) {
              let id = parseInt(match.params.id)
              let foundCampaign = this.props.campaigns.find(campaign => campaign.id === id)
              return <Details campaign={foundCampaign} />
            }
            return <div>Loading...</div>
          }} />
          <Route path='/campaigns' render={() => {
            return (
              <>
                <h1>Campaigns</h1>
                <Button color="success" href="/campaigns/create">Create New Campaign</Button>
                {this.props.campaigns ?
                  <CampaignTable campaigns={this.props.campaigns} />
                  :
                  <div>Loading...</div>
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
  return { campaigns: state.campaigns, templates: state.templates }
}

const mdp = dispatch => {
  return { fetchCampaigns: () => dispatch(getCampaigns()), fetchTemplates: () => dispatch(getTemplates()) }
}

export default connect(msp, mdp)(List)
