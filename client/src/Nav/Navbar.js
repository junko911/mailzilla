import React from 'react'
import {
  Nav,
  Navbar,
  NavItem,
  NavLink,
} from 'reactstrap'
import { connect } from 'react-redux'

const NavBar = props => {
  return (
    <div className="nav-bar">
      <Navbar
        color="light"
        dark
        expand="md"
        style={{ height: "100px" }}
      >
        {props.currentUser ?
          <>
            <Nav horizontal="center" style={{ fontSize: "25px" }}>
              <NavItem>
                <NavLink href="/campaigns">Campaigns</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/contacts">Contacts</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={props.logoutHandler}>Logout</NavLink>
              </NavItem>
            </Nav>
          </>
          :
          <>
            <Nav horizontal="center" style={{ fontSize: "25px" }}>
              <NavItem>
                <NavLink href="/login">Log In</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/signup">Sign Up</NavLink>
              </NavItem>
            </Nav>
          </>
        }
      </Navbar>
    </div>
  )
}

const msp = state => {
  return { currentUser: state.currentUser }
}

export default connect(msp)(NavBar)
