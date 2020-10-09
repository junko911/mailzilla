import React from 'react'
import { Table } from 'reactstrap'
import Row from './Row'
import { connect } from 'react-redux'
import { getCampaigns, getTemplates } from '../redux/actions'
import { Route, Switch } from 'react-router-dom'
import Detail from './Detail'
import { Button } from 'reactstrap'
import LayoutForm from './LayoutForm'
import HTMLForm from './HTMLForm'
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
            if(this.props.campaigns.length > 0) {
              let id = parseInt(match.params.id)
              let foundCampaign = this.props.campaigns.find(campaign => campaign.id === id)
              return <HTMLForm campaign={foundCampaign} />
            }
            return <div>Loading...</div>
          }} />
          <Route exact path='/campaigns/create' component={LayoutForm} />
          <Route path='/campaigns/:id' render={({ match }) => {
            let id = parseInt(match.params.id)
            let foundCampaign = this.props.campaigns.find(campaign => campaign.id === id)
            return <Detail campaign={foundCampaign} />
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
  return { campaigns: state.campaigns, templates: state.templates }
}

const mdp = dispatch => {
  return { fetchCampaigns: () => dispatch(getCampaigns()), fetchTemplates: () => dispatch(getTemplates()) }
}

export default connect(msp, mdp)(List)
