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
        color="dark"
        dark
        expand="md"
        style={{ height: "100px" }}
      >
        <NavbarBrand href="/" style={{ fontSize: "30px", paddingTop: "8px", paddingLeft: "100px", paddingRight: "50px" }}>
          <img src={"/paper-plane.png"} width="40" height="40" className="d-inline-block align-top" alt="" loading="lazy" />
          <span>&nbsp;&nbsp;</span><strong>MailZilla</strong>
        </NavbarBrand>
        {props.currentUser ?
          <>
            <Nav horizontal="center">
              <NavItem>
                <NavLink href="/campaigns"><i className="fas fa-envelope-open-text"></i>Campaigns</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/contacts"><i className="fas fa-users"></i>Contacts</NavLink>
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
