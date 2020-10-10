import React from 'react'
import {
  Nav,
  Navbar,
  NavItem,
  NavLink,
} from 'reactstrap'

const NavBar = () => {
  return (
    <div className="nav-bar">
      <Navbar
        color="light"
        dark
        expand="md"
        style={{ height: "100px" }}
      >
        <Nav horizontal="center" style={{ fontSize: "25px" }}>
          <NavItem>
            <NavLink href="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/campaigns">Campaigns</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/contacts">Contacts</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  )
}

export default NavBar
