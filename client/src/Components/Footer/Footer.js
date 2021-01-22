import React from 'react';
import CSSstyle from './Footer.module.css';
import {Box, Paper, Typography, Avatar  } from '@material-ui/core';

function Footer() {
    return (
        <Box className={CSSstyle.bgcolor}>
            <Box className={CSSstyle.box}>
                <Paper className={CSSstyle.paper} elevation={3}>
                    <i style={{color: "#64a19d"}} 
                    className="fas fa-map-marked-alt mb-2"></i>
                    <br/><br/>
                    <Typography variant="body1">ADDRESS</Typography>
                    <hr className={CSSstyle.line}/>
                    <Typography variant="subtitle2">
                    23-B Sector C, Indrapuri, Bhopal, Madhya Pradesh 462021
                    </Typography>
                </Paper>

                <Paper className={CSSstyle.paper} elevation={3}>
                    <i style={{color: "#64a19d"}} 
                    className="fas fa-envelope mb-2"></i>
                    <br/><br/>
                    <Typography variant="body1">EMAIL</Typography>
                    <hr className={CSSstyle.line}/>
                    <Typography variant="subtitle2">
                    <a rel="noopener noreferrer" target="_blank"  className={CSSstyle.mailPhone}
                    href="mailto: sheryians.community@gmail.com">sheryians.community@gmail.com</a>
                    </Typography>
                </Paper>
                <Paper className={CSSstyle.paper} elevation={3}>
                    <i style={{color: "#64a19d"}} 
                    className="fas fa-mobile-alt mb-2"></i>
                    <br/><br/>
                    <Typography variant="body1">PHONE</Typography>
                    <hr className={CSSstyle.line}/>
                    <Typography variant="subtitle2">
                        <a rel="noopener noreferrer" target="_blank"  className={CSSstyle.mailPhone} href="tel: 7828994540">+91 (782) 899-4540</a>
                    </Typography>
                </Paper>
            </Box>

            <Box className={CSSstyle.socialLinks}>
                <Avatar className={CSSstyle.socialLink}><i className="fab fa-twitter"></i></Avatar>
                <Avatar className={CSSstyle.socialLink}><i className="fab fa-facebook-f"></i></Avatar>
                <Avatar className={CSSstyle.socialLink}><i className="fab fa-github"></i></Avatar>
            </Box>
            <Typography style={{color: '#636363'}} align="center" variant="body2">Copyright © Sheryians 2020</Typography>
        </Box>
    )
}

export default Footer
