import React, {useState, useEffect} from 'react';

import { connect } from 'react-redux';

import { uploadImage } from '../../Store/Actions';


import CSSstyle from './EditProfileHeader.module.css';
import {Grid, Paper, Avatar, Button, Typography} from '@material-ui/core';
import Camera from '@material-ui/icons/Camera';

function EditProfileHeader(props) {
  const { user } = props;
  const [picture, setpicture] = useState({ oldavatar: user.avatar, avatar : '' });

  const onClickImage = () => {
    document.querySelector('#fileClick').addEventListener('click', function(){
      document.querySelector('input[type="file"]').click();
    });

    document.querySelector('input[type="file"]').onchange =  function(e){
      setpicture(prevstate => ({...prevstate, [e.target.name]: e.target.value}));
      document.querySelector('input[type="submit"]').click();
    };
  };

  const onChangeImage = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.append('oldavatar', picture.oldavatar);


    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);      
    }

    props.uploadImage(formData);
    
  };


  useEffect(() => {
    setpicture(prevstate => ({...prevstate, oldavatar: props.user.avatar}));
    return () => {};
  }, [props.user.avatar]);


  const prodImgPath = process.env.REACT_APP_BASE_URL || 'http://localhost:3080';

  return (
    <Grid className={CSSstyle.center} >
    <Paper className={CSSstyle.spacing} elevation={3}> 
    <main className={CSSstyle.details}>
    <Grid className={CSSstyle.mediaContainer}>
      <Avatar variant="rounded" className={CSSstyle.avatar} src={`${prodImgPath}/images/uploads/${user.avatar}`} />

      <form id="uploadForm" style={{display: 'none'}} onSubmit={onChangeImage} encType="multipart/fomr-data">
        <input type="file" name="avatar"/>
        <input type="submit"/>
      </form>

      <Grid>
        <Typography variant="h4">{user ? user.name : ''}</Typography>
        <Typography className={CSSstyle.downSpace} variant="subtitle1" color="textSecondary">@{ user ? user.username : ''}</Typography>


        <Button
          id="fileClick"
          onClick={onClickImage} 
          variant="contained" 
          startIcon={<Camera />} 
          className={CSSstyle.bgcolor}> 
          Change Photo</Button>
      
      
        </Grid>

    </Grid>
    <div style={{marginBottom: '1em'}}>
      <Typography className={CSSstyle.bgcolor}  style={{padding: '.2em', borderRadius: '.3em'}} variant="body2" component="span">
      Posts: { user ? user.posts.length : '' }
      </Typography> 
      <Typography variant="body2" component="span" style={{margin:'0 .5em'}}>|</Typography>
      <Typography variant="body2" component="span" color="textSecondary">
      Joined {user ? user.createdAt : ''}
      </Typography>
    </div>
    </main>
    </Paper>
    </Grid>
  )
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = ({ 
  uploadImage: uploadImage
});



export default connect(mapStateToProps, mapDispatchToProps)(EditProfileHeader);