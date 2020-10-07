import React from 'react'

const CampaignRow = ({ campaign }) => {
  return (
    <tr>
      <th scope="row">1</th>
      <td>{campaign.name}</td>
      <td>{campaign.status}</td>
      <td>{campaign.created_at}</td>
      <td>button</td>
    </tr>
  )
}

export default CampaignRow
