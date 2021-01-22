import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logoutUser } from '../../Store/Actions';

import React, { useState } from 'react';
import CSSstyle from './Navigation.module.css';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, IconButton, Typography, MenuItem, Menu} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import Timeline from '@material-ui/icons/Timeline';
import VerifiedUser from '@material-ui/icons/VerifiedUser';
import Settings from '@material-ui/icons/Settings';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

function Navigation(props) {
  const  { isAuthenticated } = props.auth;
  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const loggingout = () => {
    props.logoutUser();
    handleMenuClose();
    props.history.push('/');
  };

  const gotoProfile = () => {
    handleMenuClose();
    props.history.push('/profile');
  };

  const gotoTimeline = () => {
    handleMenuClose();
    props.history.push('/timeline');
  };

  const gotoSetting = () => {
    handleMenuClose();
    props.history.push('/editprofile');
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={gotoTimeline}>
        <IconButton title="Timeline" color="inherit">
            <Timeline />
        </IconButton>
        <p>Timeline</p>
      </MenuItem>
      <MenuItem onClick={gotoProfile}>
        <IconButton title="Profile" color="inherit">
            <VerifiedUser />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={loggingout}>
        <IconButton title="Logout" color="inherit">
          <AccountCircle />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
      <MenuItem onClick={gotoSetting}>
      <IconButton title="Settings" color="inherit">
        <Settings />
      </IconButton>
      <p>Settings</p>
    </MenuItem>
    </Menu>
  );
  return (
    <div className={classes.grow}>
      <AppBar position="static" className={CSSstyle.backgroundColor}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
              <Link
              style={{textDecoration: 'none', color: '#fff'}}
               className={CSSstyle.Link} 
               to={ isAuthenticated ? '/timeline' : '/'}>SheryishKill</Link>           
          </Typography>
          <div className={classes.grow} />

         { isAuthenticated ? (

          <div className={classes.sectionDesktop}>
          <IconButton onClick={gotoTimeline}
            title="Timeline" color="inherit">
              <Timeline />        
          </IconButton>
          <IconButton onClick={gotoProfile}
            title="Profile" color="inherit">
              <VerifiedUser />
          </IconButton>
          <IconButton
            onClick={loggingout}
            title="Logout" color="inherit">
            <AccountCircle />
          </IconButton>
          <IconButton
            onClick={gotoSetting}
            title="Settings" color="inherit">
            <Settings />
          </IconButton>
        </div>

         ) : '' }

            

         { isAuthenticated ? (

          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>

          ) : '' }
         

        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
}


Navigation.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = ({ 
  logoutUser:logoutUser
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation));