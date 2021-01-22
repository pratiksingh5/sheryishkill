import React, {useState, useEffect} from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { profile, createPost } from '../../Store/Actions';


    import CSSstyle from './Profile.module.css';
    import { Container, Typography, TextField, Button, Divider } from '@material-ui/core';
    import EditProfileHeader from '../EditProfileHeader/EditProfileHeader';
    import Post from '../Post/Post';

    function Profile(props) {
        const [posts, setposts] = useState(null);
    const [user, setuser] = useState(null);


    const initialFormData = {postText: ''};
  const initialFormError = {postText: ''};
  const [formData, setformData] = useState(initialFormData);
  const [error, setError] = useState(initialFormError);

  const onFormChange = (e) => {
    e.persist();
    setformData(prevState => ({...prevState, [e.target.name]:e.target.value}));
  };

  const inputValidation = () => {
      if(!formData.postText) 
      setError(prevState => ({
        ...prevState,
        postText: 'Field Must Not Empty'      
      }));
  };

  const onFormSubmit = (e) => {
      e.preventDefault();

      inputValidation();

      if(formData.postText){
        props.createPost(formData);
        setTimeout(() => props.fetchProfile(), 2000);
      }
  };


    useEffect(() => {
        const callProfile = () => {
            props.fetchProfile();
            setuser(props.auth.user);
        };

        if(!props.posts.posts && !props.posts.errors )
            callProfile();
        if(props.posts.posts)
            setposts(props.posts.posts);
        

        return () => { };
    }, [props]);


    let displayPosts;
    let displayHeader;
    if( posts && user) {
        displayPosts = posts.map(post => <Post key={post._id} post={post} user={user} />);
        displayHeader = <EditProfileHeader user={user} />;
    }


        return (
            <Container>
                {displayHeader}
                <Typography className={CSSstyle.thin} variant="h6" >Change the world with your thoughts...</Typography>
                <form onSubmit={onFormSubmit}>
                <TextField
                type="text"
                name="postText"
                onChange={onFormChange}
                placeholder="Your thoughts..."
                multiline
                fullWidth
                margin="normal"
                rows={3}
                variant="outlined"
            />
            <Typography 
            variant="inherit"
            component="small"
            color="secondary">{(error.postText && !formData.postText) ? error.postText : '' }</Typography>
            <br/><br/>
            <Button type="submit" variant="contained" className={CSSstyle.bgcolor}> Show The World </Button> 
            </form>
            <Divider style={{margin: '1em 0'}} />
            <Typography variant="h6" color="textSecondary" >Personal Timeline</Typography>

            {displayPosts}
            
            </Container>
        )
    }


    Profile.propTypes = {
        auth: PropTypes.object.isRequired,
        posts: PropTypes.object.isRequired,
        fetchProfile: PropTypes.func.isRequired,
        createPost: PropTypes.func.isRequired
      }
      
      const mapStateToProps = state => ({
        auth: state.auth,
        posts: state.posts
      });
      
      const mapDispatchToProps = ({ 
        fetchProfile: profile,
        createPost: createPost
      });


    export default connect(mapStateToProps, mapDispatchToProps)(Profile)
