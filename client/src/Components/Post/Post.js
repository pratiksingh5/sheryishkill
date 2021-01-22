import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { profile, timeline, likePost, dislikePost } from '../../Store/Actions';


import CSSstyle from './Post.module.css';
import {Paper, Avatar, Box, Typography, Container, Accordion, AccordionSummary, AccordionDetails, IconButton} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function Post(props) {
    const { post, user }  = props;


    function formatDate(xDate){
        let postdate = new Date(xDate);
        let modifiedDate = postdate.getDate() < 10 ? '0'+postdate.getDate() : postdate.getDate() + ' ' +
                            postdate.toLocaleString('default', { month: 'short' }) + ' ' +
                            postdate.getFullYear() + ', ' + postdate.toLocaleTimeString();
        return modifiedDate;
    }

    const postActions = (event) => {
        if(event.target.classList.contains('fa-thumbs-up')){
            console.log('liked', post._id);
            props.likePost(post._id);
        }

        if(event.target.classList.contains('fa-thumbs-down')){
            console.log('disliked', post._id);
            props.dislikePost(post._id);
        }

        setTimeout(() => {
            if(user) props.fetchProfile();
            else props.fetchTimeline();
        }, 2000);

    };

  const prodImgPath = process.env.REACT_APP_BASE_URL || 'http://localhost:3080';


    return (
        <Paper className={CSSstyle.paper} elevation={3}>
        <Container style={{display: 'flex'}}>
        <Avatar variant="rounded" className={CSSstyle.avatar} 
        src={ `${prodImgPath}/images/uploads/${user ? user.avatar : post.postedBy.avatar}` } />
        <Box>
            <Box className={CSSstyle.social}>
                <Typography variant="inherit" component="h6">
                    {post ? formatDate(post.createdAt) : ''}
                </Typography>

                <Accordion className={CSSstyle.accordian}>
                    <AccordionSummary
                    expandIcon={<IconButton><ExpandMoreIcon /></IconButton>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"></AccordionSummary>
                    <AccordionDetails onClick={postActions} className={CSSstyle.socialContent}>
                    <i className={`fa fa-thumbs-up ${CSSstyle.like} `}></i>
                    <i className={`fa fa-thumbs-down ${CSSstyle.dislike} `}></i>
                    </AccordionDetails>
                </Accordion>
            </Box>
            <Typography variant="body1" component="h6">
            {post ? post.postedBy.name : ''}
            {user ? user.name : ''}        
            </Typography>
            <Typography variant="subtitle2" component="h6">@
                {post ? post.postedBy.username : ''}
                {user? user.username : ''}
                </Typography>
            <Typography variant="body2" component="h6">{post ? post.postText : ''}</Typography>
            <Typography variant="inherit" component="small">
            {post ? post.like.length : ''} Like | {post ? post.dislike.length : ''} Dislike</Typography>

        </Box>
        </Container>
        </Paper>
    )
}


Post.propTypes = {
    auth: PropTypes.object.isRequired,
    posts: PropTypes.object.isRequired,
    fetchProfile: PropTypes.func.isRequired,
    likePost: PropTypes.func.isRequired,
    dislikePost: PropTypes.func.isRequired,
  }
  
  const mapStateToProps = state => ({
    auth: state.auth,
    posts: state.posts
  });
  
  const mapDispatchToProps = ({ 
    fetchProfile: profile,
    fetchTimeline: timeline,
    likePost: likePost,
    dislikePost: dislikePost
  });

export default connect(mapStateToProps, mapDispatchToProps)(Post)
