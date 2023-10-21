import './navbar.css';
import React from "react";
import { slide as Menu } from 'react-burger-menu';
import { Outlet, Link } from "react-router-dom";
import avatarImage from './man.png';

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
          <div className="avatar-container">
                        <img className="avatar" src={avatarImage} alt="Avatar" />
                    </div>
            <Link onClick={() => this.closeMenu()} className="menu-item" to="/home">Home</Link>
            <Link onClick={() => this.closeMenu()} className="menu-item" to="/category">Category</Link>
            <Link onClick={() => this.closeMenu()} className="menu-item" to="/product">Product</Link>
            <Link onClick={() => this.closeMenu()} className="menu-item" to="/order">Orders</Link>
            <Link onClick={() => this.closeMenu()} className="menu-item" to="/logout">Logout</Link>
        </Menu>
        <Outlet/>
    </div>
    );
}

}
