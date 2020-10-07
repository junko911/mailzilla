import React from 'react'
import {
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap'

const NavBar = () => {
  return (
    <div className="nav-bar">
      <Nav horizontal="center">
        <NavItem>
          <NavLink href="/campaigns">Campaigns</NavLink>
        </NavItem>
      </Nav>
    </div>
  )
}

export default NavBar
