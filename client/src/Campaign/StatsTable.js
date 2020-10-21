import React, { useState, useEffect } from 'react'
import { MDBDataTableV5 } from 'mdbreact'
import moment from 'moment'

const StatsTable = ({ campaign }) => {

  const [dataColumns] = useState([
    {
      label: 'Name',
      field: 'name',
      width: 30,
    },
    // {
    //   label: 'Email',
    //   field: 'email',
    //   width: 30,
    // },
    {
      label: 'Status',
      field: 'status',
      width: 30,
    },
    // {
    //   label: 'Sent at',
    //   field: 'sentAt',
    //   width: 100,
    // },
    {
      label: 'Delivered at',
      field: 'deliveredAt',
      width: 150,
    },
    {
      label: 'Opened at',
      field: 'openedAt',
      width: 150,
    },
    {
      label: 'Clicked at',
      field: 'clickedAt',
      width: 150,
    }
  ])

  const [dataRows, setDataRows] = useState([])

  useEffect(() => {
    const getRows = () => {
      return campaign.contacts.map(contact => {
        return {
          name: contact.contact.name,
          // email: contact.contact.email,
          status: contact.status,
          // sentAt: moment(contact.created_at).format('lll'),
          deliveredAt: contact.delivered_at ? moment(contact.delivered_at).format('lll') : null,
          openedAt: contact.open_at ? moment(contact.open_at).format('lll') : null,
          clickedAt: contact.click_at ? moment(contact.click_at).format('lll') : null
        }
      })
    }
    setDataRows(getRows())
  }, [campaign])

  return (
    <div className="main" style={{ marginTop: "30px" }}>
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
    </div>
  )
}

export default StatsTable
