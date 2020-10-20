import React, { useEffect, useState } from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import { Button, Form, Label, Input } from 'reactstrap'

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

  const [filterTerm, setFilterTerm] = useState("")

  useEffect(() => {
    const contacts = filterTerm === "" ? props.contacts : props.contacts.filter(contact => contact.segments.map(e => e.name).includes(filterTerm))
    const getRows = () => {
      return contacts.map(contact => {
        return {
          name: contact.name,
          email: contact.email,
          segments: contact.segments.map(segment => <Button key={segment.id} size="sm" outline disabled style={{ marginRight: "10px" }}>{segment.name}</Button>),
          details: <Button color="info" href={`/contacts/${contact.id}`}>Details</Button>
        }
      })
    }
    setDataRows(getRows())
  }, [props.contacts, filterTerm])

  const genOptions = () => {
    return props.segments ? props.segments.map(segment => <option value={segment.name} key={segment.id}>{segment.name}</option>) : null
  }

  return (
    <>
      <div className="main">
        <Form inline>
          <Input type="select" onChange={e => setFilterTerm(e.target.value)} style={{ fontSize: "0.875rem" }}>
            <option value="">Filter by segment</option>
            {genOptions()}
          </Input>
        </Form>
        <MDBDataTableV5
          className="contact-table"
          hover
          data={{ columns: dataColumns, rows: dataRows }}
          fixed
          pagingTop
          searchTop
          searchBottom={false}
        />
      </div>
    </>
  )
}

export default ContactTable
