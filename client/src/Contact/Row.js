import React from 'react'
import { Button } from 'reactstrap'
import moment  from 'moment'

const Row = ({ contact }) => {
  return (
    <tr>
      <th scope="row">{contact.id}</th>
      <td>{contact.name}</td>
      <td>{contact.email}</td>
      <td>{moment(contact.created_at).calendar()}</td>
      <td><Button color="info" href={`/contacts/${contact.id}`}>Details</Button></td>
    </tr>
  )
}

export default Row
