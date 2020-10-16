import React, { useEffect, useState } from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import { Button } from 'reactstrap'

const ContactTable = props => {

  const [dataColumns] = useState([
    {
      label: 'Name',
      field: 'name',
      width: 100,
    },
    {
      label: 'Email',
      field: 'email',
      width: 270,
    },
    {
      label: 'Segments',
      field: 'segments',
      width: 270,
      sort: 'disabled',
    },
    {
      label: '',
      field: 'details',
      sort: 'disabled',
      width: 200,
    }
  ])

  const [dataRows, setDataRows] = useState([])

  useEffect(() => {
    const getRows = () => {
      return props.contacts.map(contact => {
        return {
          name: contact.name,
          email: contact.email,
          segments: contact.segments.map(segment => <Button key={segment.id} size="sm" outline disabled style={{marginRight:"10px"}}>{segment.name}</Button>),
          details: <Button color="info" href={`/contacts/${contact.id}`}>Details</Button>
        }
      })
    }
    setDataRows(getRows())
  }, [props.contacts])

  return <MDBDataTableV5
  hover
  data={{ columns: dataColumns, rows: dataRows }}
  fixed
  pagingTop
  searchTop
  searchBottom={false}
/>
}

export default ContactTable
