import React from 'react'
import { Button, Table } from 'reactstrap'
import Row from './Row'
import { connect } from 'react-redux'
import { getCampaigns, getTemplates } from '../redux/actions'
import { Route, Switch } from 'react-router-dom'
import Details from './Details'
import CreateForm from './CreateForm'
import EditForm from './EditForm'
import Preview from './Preview'

class List extends React.Component {

  componentDidMount() {
    this.props.fetchCampaigns()
    this.props.fetchTemplates()
  }

  genCampaignRows = () => {
    return this.props.campaigns.map(campaign => {
      return <Row key={campaign.id} campaign={campaign} />
    })
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
            if (this.props.campaigns.length > 0) {
              let id = parseInt(match.params.id)
              let foundCampaign = this.props.campaigns.find(campaign => campaign.id === id)
              return <EditForm campaign={foundCampaign} />
            }
            return <div>Loading...</div>
          }} />
          <Route exact path='/campaigns/create' component={CreateForm} />
          <Route path='/campaigns/:id' render={({ match }) => {
            let id = parseInt(match.params.id)
            let foundCampaign = this.props.campaigns.find(campaign => campaign.id === id)
            return <Details campaign={foundCampaign} />
          }} />
          <Route path='/campaigns' render={() => {
            return (
              <>
                <h1>Campaigns</h1>
                <Button color="success" href="/campaigns/create">Create New Campaign</Button>
                <Table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Segment</th>
                      <th>Status</th>
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
  return { campaigns: state.campaigns, templates: state.templates }
}

const mdp = dispatch => {
  return { fetchCampaigns: () => dispatch(getCampaigns()), fetchTemplates: () => dispatch(getTemplates()) }
}

export default connect(msp, mdp)(List)
