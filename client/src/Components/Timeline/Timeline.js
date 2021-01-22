import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
 
import { Link } from 'react-router-dom';

import { timeline } from '../../Store/Actions';

import CSSstyle from './Timeline.module.css';
import { Container, Typography, Button, Divider, Box } from '@material-ui/core';
import Post from '../Post/Post';

function Timeline(props) {
    const [posts, setposts] = useState(null);
    const [user, setuser] = useState(null);

    useEffect(() => {
        const callTimeline = () => {
            props.fetchTimeline();
            setuser(props.auth.user);
        };

        if(!props.posts.posts && !props.posts.errors )
            callTimeline();
        if(props.posts.posts)
            setposts(props.posts.posts);
        

        return () => {};
    }, [props]);


    let displayPosts;
    if( posts && user) {
        displayPosts = posts.map(post => <Post key={post._id} post={post} />)
    }

    return (
        <Container>
            <Typography variant="h4">
            Hello! { user ? user.username : ''} 
            <span role="img" aria-label="hi" aria-labelledby="hi">👋</span>
            </Typography>
            <Button
            type="submit"
            variant="contained"
            className={CSSstyle.bgcolor}
          > 
          <Link style={{ textDecoration: 'none', color:'#fff' }} to="/profile">
          What Is In Your Mind 
          </Link>
          
          </Button>
          <Divider style={{margin: '1em 0'}} />
            <Typography variant="h5">Trending Posts</Typography>
            <Box className={CSSstyle.posts}>
                
            {displayPosts ? displayPosts : <Typography align="center" color="secondary" variant="body1">Posts Loading...</Typography>}

            </Box>  
        </Container>
    )
}

Timeline.propTypes = {
    auth: PropTypes.object.isRequired,
    posts: PropTypes.object.isRequired,
    fetchTimeline: PropTypes.func.isRequired
  }
  
  const mapStateToProps = state => ({
    auth: state.auth,
    posts: state.posts
  });
  
  const mapDispatchToProps = ({ 
    fetchTimeline: timeline
  });

export default connect(mapStateToProps, mapDispatchToProps)(Timeline)
