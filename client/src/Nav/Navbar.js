import React from 'react'
import {
  Nav,
  Navbar,
  NavItem,
  NavLink,
  Button
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
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/campaigns">Campaigns</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/contacts">Contacts</NavLink>
              </NavItem>
            </Nav>
            <Button onClick={props.logoutHandler}>Logout</Button>
          </>
          :
          <>
            <Nav horizontal="center" style={{ fontSize: "25px" }}>
              <NavItem>
                <NavLink href="#">Log In</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Sign Up</NavLink>
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
