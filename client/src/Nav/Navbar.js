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
        <Nav horizontal="center" style={{ fontSize: "25px" }}>
          <NavbarBrand href="/">
              <img src={"./paper-plane.png"} width="30" height="30" className="d-inline-block align-top" alt="" loading="lazy"/>
                Mailzilla
          </NavbarBrand>
            {props.currentUser ?
              <>
                <NavItem>
                  <NavLink href="/campaigns">Campaigns</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/contacts">Contacts</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={props.logoutHandler}>Logout</NavLink>
                </NavItem>
              </>
              :
              <>
                <NavItem>
                  <NavLink href="/login">Log In</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/signup">Sign Up</NavLink>
                </NavItem>
              </>
            }
        </Nav>
      </Navbar>
    </div>
  )
}

const msp = state => {
  return { currentUser: state.currentUser }
}

export default connect(msp)(NavBar)
