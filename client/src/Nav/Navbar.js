import React from 'react'
import {
  Nav,
  Collapse,
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
        color="dark"
        dark
        expand="md"
        style={{ height: "100px" }}
      >
        <NavbarBrand href="/" style={{ fontSize: "25px", paddingTop: "8px", paddingLeft: "100px", paddingRight: "50px" }}>
          <img src={"./paper-plane.png"} width="30" height="30" className="d-inline-block align-top" alt="" loading="lazy" />
          <span>&nbsp;&nbsp;</span><strong>Mailzilla</strong>
        </NavbarBrand>
        {props.currentUser ?
          <>
            <Nav horizontal="center">
              <NavItem>
                <NavLink href="/campaigns">Campaigns</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/contacts">Contacts</NavLink>
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
