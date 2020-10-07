import React from 'react'
import { Table } from 'reactstrap'
import CampaignRow from './CampaignRow'

const Campaigns = () => {
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
          <CampaignRow/>
        </tbody>
      </Table>
    </>
  )
}

export default Campaigns
