import React, { useState, useEffect } from 'react'
import { MDBDataTableV5 } from 'mdbreact';

const StatsTable = ({campaign}) => {

  const [dataColumns] = useState([
    {
      label: 'Contact Name',
      field: 'name',
      width: 300,
    },
    {
      label: 'Email',
      field: 'email',
      width: 300,
    },
    {
      label: 'Status',
      field: 'status',
      width: 150,
    },
    {
      label: 'Sent at',
      field: 'sentAt',
      width: 200,
    }
  ])

  const [dataRows, setDataRows] = useState([])

  useEffect(() => {
    const getRows = () => {
      return campaign.contacts.map(contact => {
        return {
          name: contact.contact.name,
          email: contact.contact.email,
          status: contact.status,
        }
      })
    }
    setDataRows(getRows())
  }, [campaign])

  return (
    <MDBDataTableV5
      hover
      data={{ columns: dataColumns, rows: dataRows }}
      paging={false}
      fixed
      info={false}
      searching={false}
      scrollY
      maxHeight='300px'
    />
  )
}

export default StatsTable
