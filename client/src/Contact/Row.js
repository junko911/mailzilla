import React from 'react'
import { Button } from 'reactstrap'

const Row = ({ contact }) => {
  return (
    <tr>
      <th scope="row">{contact.id}</th>
      <td>{contact.name}</td>
      <td>{contact.email}</td>
      <td>{contact.created_at}</td>
      <td><Button color="info" href={`/contacts/${contact.id}`}>Details</Button></td>
    </tr>
  )
}

export default Row
