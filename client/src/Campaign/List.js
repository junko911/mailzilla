import React from 'react'
import { Table } from 'reactstrap'
import Row from './Row'
import { connect } from 'react-redux'
import { getCampaigns } from '../redux/actions'
import { Route, Switch } from 'react-router-dom'
import Detail from './Detail'
import { Button } from 'reactstrap'
import LayoutForm from './LayoutForm'
import HTMLForm from './HTMLForm'
import Preview from './Preview'

class List extends React.Component {

  componentDidMount() {
    this.props.fetchCampaigns()
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
          <Route exact path='/campaigns/edit/:id/preview' render={({ match }) => {
            let id = parseInt(match.params.id)
            return <Preview id={id} />
          }} />
          <Route exact path='/campaigns/edit/:id' render={({ match }) => {
            let id = parseInt(match.params.id)
            let foundCampaign = this.props.campaigns.find(campaign => campaign.id === id)
            return <HTMLForm campaign={foundCampaign} />
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
  return { campaigns: state.campaigns }
}

const mdp = dispatch => {
  return { fetchCampaigns: () => dispatch(getCampaigns()) }
}

export default connect(msp, mdp)(List)
