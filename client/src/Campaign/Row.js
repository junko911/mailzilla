import React from 'react'
import { Button } from 'reactstrap'

const Row = ({ campaign }) => {
  return (
    <tr>
      <th scope="row">{campaign.id}</th>
      <td>{campaign.name}</td>
      <td>{campaign.segment.name}</td>
      <td>{campaign.status}</td>
      <td><Button color="info" href={`/campaigns/${campaign.id}`}>Details</Button></td>
    </tr>
  )
}

export default Row
