import React from 'react'
import {
  Nav,
  Navbar,
  NavItem,
  NavLink,
  NavbarBrand
} from 'reactstrap'
import { connect } from 'react-redux'

const NavBar = props => {
  return (
    <div className="nav-bar">
      <Navbar
        color="light"
        light
        expand="md"
      >
        <NavbarBrand href="/">
          <img src={"/paper-plane.png"} width="28" height="28" className="d-inline-block align-middle" alt="" loading="lazy" />
          <span style={{ marginLeft: "8px" }}>MailZilla</span>
        </NavbarBrand>
        {props.currentUser ?
          <>
            <Nav horizontal="center">
              <NavItem>
                <NavLink href="/campaigns"><i className="fas fa-envelope-open-text mr-2"></i>Campaigns</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/contacts"><i className="fas fa-users mr-2"></i>Contacts</NavLink>
              </NavItem>
            </Nav>
            <Nav className="ml-auto auth">
              <NavItem>
                <NavLink onClick={props.logoutHandler}>Logout</NavLink>
              </NavItem>
            </Nav>
          </>
          :
          <Nav className="ml-auto auth">
            <NavItem>
              <NavLink href="/login">Log In</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/signup">Sign Up</NavLink>
            </NavItem>
          </Nav>
        }
      </Navbar>
    </div>
  )
}

const msp = state => {
  return { currentUser: state.currentUser }
}

export default connect(msp)(NavBar)
