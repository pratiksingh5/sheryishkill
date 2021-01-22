import React, {useState} from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { resetpassword } from '../../Store/Actions';


import { TextField, Button, Typography, Container } from '@material-ui/core';
import CSSstyle from './ResetForm.module.css';

function ResetForm(props) {

    const initialFormData = {oldpassword: '', newpassword: ''};
  const initialFormError = {oldpassword: '', newpassword: ''};
  const [formData, setformData] = useState(initialFormData);
  const [error, setError] = useState(initialFormError);

  const onFormChange = (e) => {
    e.persist();
    setformData(prevState => ({...prevState, [e.target.name]:e.target.value}));
  }

  const inputValidation = () => {
      if(!formData.oldpassword) 
      setError(prevState => ({
        ...prevState,
        oldpassword: 'Password Field Must Not Empty'      
      }));

      if(!formData.newpassword) 
      setError(prevState => ({
        ...prevState,
        newpassword: 'Password Field Must Not Empty'      
      }));
  };

  const onFormSubmit = (e) => {
      e.preventDefault();

      inputValidation();

      if(formData.oldpassword && formData.newpassword){
        // props.signUser(formData, props.history);
        
        props.resetpassword(formData,props.history);
      }
  };



    return (
        <Container style={{textAlign: 'center'}}>
        <Typography variant="h3">Reset Password</Typography>
        <form onSubmit={onFormSubmit}>
        <TextField
                className={CSSstyle.width}
                type='password'
                name="oldpassword"
                onChange={onFormChange}
                placeholder="Old Password"
                margin="normal"
                variant="outlined"
            /> <br/>
            <Typography 
            variant="inherit"
            component="small"
            color="secondary">{(error.oldpassword && !formData.oldpassword) ? error.oldpassword : '' }</Typography>
            <br/>
            <TextField
                className={CSSstyle.width}
                type='password'
                name="newpassword"
                onChange={onFormChange}
                placeholder="New Password"
                margin="normal"
                variant="outlined"
            /> <br/>
            <Typography 
            variant="inherit"
            component="small"
            color="secondary">{(error.newpassword && !formData.newpassword) ? error.newpassword : '' }</Typography>
            <br/>
        <Button variant="contained" type="submit" className={CSSstyle.bgcolor}> I'm Ready </Button>
        </form>
        </Container>
    )
}

ResetForm.propTypes = {
    resetpassword: PropTypes.func.isRequired
  }
  
  const mapStateToProps = state => ({
    
   
  });
  
  const mapDispatchToProps = ({ 
    resetpassword: resetpassword
  });

export default connect(mapStateToProps, mapDispatchToProps)(ResetForm);
