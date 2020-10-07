import React from 'react'
import { Table } from 'reactstrap'

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
          <tr>
            <th scope="row">1</th>
            <td>Campaign 1</td>
            <td>Draft</td>
            <td>10/5/2020</td>
            <td>button</td>
          </tr>
        </tbody>
      </Table>
    </>
  )
}

export default Campaigns
