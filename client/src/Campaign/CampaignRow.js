import React from 'react'
import { Button } from 'reactstrap';

const CampaignRow = ({ campaign }) => {
  return (
    <tr>
      <th scope="row">1</th>
      <td>{campaign.name}</td>
      <td>{campaign.status}</td>
      <td>{campaign.created_at}</td>
      <td><Button color="info" href={`/campaigns/${campaign.id}`}>Details</Button></td>
    </tr>
  )
}

export default CampaignRow
