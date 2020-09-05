import React from 'react';
import { connect } from 'react-redux';
import { setMessageIndicator } from '../redux/actions';
// import './navbar.css';
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Avatar, Badge  } from '@material-ui/core';
import { AccountCircle} from '@material-ui/icons';

class Navbar extends React.Component {

    componentDidMount() {
        this.getCurrentUser();
    }

    state = {
        anchorEl: null,
        image: ''
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleLogOut = () => {
        this.handleClose();
        let url = "/logout";

        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookies.get('Authorization')
            }
        }).then(response => {
            //console.log(response);
            //return response.json();
            Cookies.remove('Authorization', { path: '/' })
            Cookies.remove('currentUser', { path: '/' })
            this.checkResponseStatus(response);
        })
        .catch(error => console.error('Error:', error))
    }

    getCurrentUser = () => {
        let data = {
            user_id: Cookies.getJSON('currentUser').user_id
        }
        let url = `/get_user?id=${Cookies.getJSON('currentUser').user_id}`
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookies.get('Authorization')
            }
        }).then(response => {
            //console.log(response)
            return response.json()
        }).then(data => {
            this.setState({
                image: data.data,
                userName: data.name
            })

        })
        .catch(error => console.error('Error:', error))
    }

    checkResponseStatus = (response) => {
        if (response.status === 204) {
            this.props.history.push("/login")
        }
    }

    handleInputMenu = () => {
        if(this.props.messageIndicator) this.props.setMessageIndicator(false)
        this.handleClose()
    }

    render() {
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                        {this.props.title}
                    </Typography>
                    <div id='user-menu'>
                        {this.state.userName}
                        <Badge color="secondary" invisible={!this.props.messageIndicator} overlap="circle" badgeContent=" ">
                            <IconButton
                            aria-owns={open ? 'menu-appbar' : undefined}
                            aria-haspopup="true"
                            onClick={this.handleMenu}
                            color="inherit"
                            id="menu-button"
                            >
                                {this.state.image=='' ? <AccountCircle /> : <img style={{width: '20px', borderRadius: '5px'}} src={this.state.image} />}
                            </IconButton>
                        </Badge>
                        <Menu
                        id="menu-appbar"
                        disableAutoFocusItem={true}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={open}
                        onClose={this.handleClose}
                        >
                            <Link to='/' style={{textDecoration: 'none'}}><MenuItem onClick={this.handleClose} className="link">Map</MenuItem></Link>
                            <Link to='/inbox' style={{textDecoration: 'none'}}><MenuItem onClick={this.handleInputMenu} className="link">Inbox</MenuItem></Link>
                            <Link to='/myrequests' style={{textDecoration: 'none'}}><MenuItem onClick={this.handleClose} className="link">My requests</MenuItem></Link>
                            <Link to='/accountsettings' style={{textDecoration: 'none'}}><MenuItem onClick={this.handleClose} className="link">Account Settings</MenuItem></Link>
                            <MenuItem onClick={this.handleLogOut} style={{color: '#ff5252'}}>Log out</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        messageIndicator: state.messageIndicator
    }
  }

export default connect(
    mapStateToProps, 
    { setMessageIndicator }
)(Navbar);

