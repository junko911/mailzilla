import React, { useEffect, useState } from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import { Button } from 'reactstrap'

const CampaignTable = props => {

  const [dataColumns] = useState([
    {
      label: 'Name',
      field: 'name',
      width: 150,
      attributes: {
        'aria-controls': 'DataTable',
        'aria-label': 'Name',
      },
    },
    {
      label: 'Segment',
      field: 'segment',
      width: 100,
    },
    {
      label: 'Number of contacts',
      field: 'numOfContacts',
      width: 270,
    },
    {
      label: 'Status',
      field: 'status',
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
      return props.campaigns.map(campaign => {
        return {
          name: campaign.name,
          segment: campaign.segment.name,
          numOfContacts: campaign.num_of_contacts,
          status: campaign.status,
          details: <Button color="info" href={`/campaigns/${campaign.id}`}>Details</Button>
        }
      })
    }
    setDataRows(getRows())
  }, [props.campaigns])

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

export default CampaignTable
