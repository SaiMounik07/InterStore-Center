import './navbar.css';
import React from "react";
import { slide as Menu } from 'react-burger-menu';
import { Outlet, Link } from "react-router-dom";

export default class Navbar extends React.Component {
    state = {
        menuOpen: false
      };
      handleStateChange(state) {
        this.setState({ menuOpen: state.isOpen });
      }
      closeMenu() {
       this.setState({ menuOpen: false });
      }
      render() {

    return(

    <div>
        <Menu
        isOpen={this.state.menuOpen}
        onStateChange={state => this.handleStateChange(state)}>
            <Link onClick={() => this.closeMenu()} className="menu-item" to="/home">Home</Link>
            <Link onClick={() => this.closeMenu()} className="menu-item" to="/category">Category</Link>
            <Link onClick={() => this.closeMenu()} className="menu-item" to="/Product">Product</Link>
        </Menu>
        <Outlet/>
    </div>
    );
}

}
