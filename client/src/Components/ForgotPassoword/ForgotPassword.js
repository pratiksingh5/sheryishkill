import React, {useState} from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { forgetpassword } from '../../Store/Actions';

import CSSstyle from './ForgotPassword.module.css';
import { Container, Typography, TextField, Button } from '@material-ui/core';

function ForgotPassword(props) {

    
  const initialFormData = {email : ''};
  const initialFormError = {email : ''};
  const [formData, setformData] = useState(initialFormData);
  const [error, setError] = useState(initialFormError);

  const onFormChange = (e) => {
    e.persist();
    setformData(prevState => ({...prevState, [e.target.name]:e.target.value}));
  }

  const inputValidation = () => {
      if(!formData.email) 
      setError(prevState => ({
        ...prevState,
        email: 'Email Field Must Not Empty'      
      }));
  };

  const onFormSubmit = (e) => {
      e.preventDefault();

      inputValidation();

      if(formData.email){
            props.forgetpassword(formData, props.history);

      }
  };


    return (
        <Container style={{textAlign: 'center'}}>
        <Typography variant="h3">Password Recovery</Typography>
        <form onSubmit={onFormSubmit} > 
        <TextField
                name="email"
                onChange={onFormChange}
                className={CSSstyle.width}
                type='email'
                placeholder="registered email"
                margin="normal"
                variant="outlined"
            /> <br/>
            <Typography 
            variant="inherit"
            component="small"
            color="secondary">{(error.email && !formData.email) ? error.email : '' }</Typography>
            <br/> <br/>
        <Button type="submit" variant="contained" className={CSSstyle.bgcolor}> Are You Sure ? </Button>
        </form>
        </Container>
    )
}


ForgotPassword.propTypes = {
    forgetpassword: PropTypes.func.isRequired
  }
  
  const mapStateToProps = state => ({
  });
  
  const mapDispatchToProps = ({ 
    forgetpassword: forgetpassword
  });

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
