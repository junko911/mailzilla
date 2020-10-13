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
          details: <Button color="info" href={`/contacts/${contact.id}`}>Details</Button>
        }
      })
    }
    setDataRows(getRows())
  }, [props.contacts])

  return <MDBDataTableV5
    hover
    entriesOptions={[5, 20, 25]}
    entries={5}
    pagesAmount={4}
    data={{ columns: dataColumns, rows: dataRows }}
    pagingTop
    searchTop
    searchBottom={false}
    barReverse
  />
}

export default ContactTable
