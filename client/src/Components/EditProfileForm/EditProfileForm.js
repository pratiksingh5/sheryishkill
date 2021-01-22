import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { editUser, deleteUser } from '../../Store/Actions';

import CSSstyle from './EditProfileForm.module.css';
import { Typography, TextField, Container,Divider, RadioGroup, Radio, FormControlLabel, Button } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import RestoreTwoTone from '@material-ui/icons/RestoreTwoTone';
import EditProfileHeader from '../EditProfileHeader/EditProfileHeader';
function EditProfileForm(props) {
    

  const initStateErr = {name: '', email: '', username: '', address: '',
                        contact: '', gender: '', about: ''};
  const [user, setuser] = useState(null);
  const [error, setError] = useState(initStateErr);


  useEffect(() => {
      let initState = { name: '', email: '', username: '', address: '',
                        contact: '', gender: 'female', about: ''  };

        setuser({...initState, ...props.auth.user});
      return () => { };
  }, [props.auth.user]);


    let displayHeader;
    if(user) displayHeader = <EditProfileHeader user={user} />

  const onFormChange = (e) => {
    e.persist();
    setuser(prevState => ({...prevState, [e.target.name]:e.target.value}));
  };

  const inputValidation = () => {
    if(!user.email) 
      setError(prevState => ({
        ...prevState,
        email: 'Email Field Must Not Empty'      
      }));

      if(!user.username) 
      setError(prevState => ({
        ...prevState,
        username: 'Username Field Must Not Empty'      
      }));

      if(!user.name) 
      setError(prevState => ({
        ...prevState,
        name: 'Name Field Must Not Empty'      
      }));

      if(!user.address) 
      setError(prevState => ({
        ...prevState,
        address: 'Address Field Must Not Empty'      
      }));

      if(!user.contact) 
      setError(prevState => ({
        ...prevState,
        contact: 'Contact Field Must Not Empty'      
      }));

      if(!user.about) 
      setError(prevState => ({
        ...prevState,
        about: 'About Field Must Not Empty'      
      }));
  };

  const onFormSubmit = (e) => {
      e.preventDefault();

      inputValidation();

      if(user.username && user.email && user.name && user.contact && user.about && user.address){
          props.editUser(user);
      }
  };

  const deleteUser = () => {
      if(window.confirm('Do you want to delete the account ?')){
        props.deleteUser(props.history);
      }
  };

    return (
        <Container className={CSSstyle.center}>
            <Typography variant="h4">Edit Profie Details...</Typography>
            {displayHeader}
            <div style={{textAlign: 'center'}}>
            
            <Button 
                style={{margin: '0 1em 1em 0 '}}
                variant="contained" 
                startIcon={<RestoreTwoTone />} 
                className={CSSstyle.bgcolor}> 
                <Link style={{textDecoration: 'none', color: '#fff'}} 
                to="/resetpassword">Reset Password</Link>
                
                
                </Button>
            
            <Button 
                style={{marginBottom: '1em'}}
                onClick={deleteUser}
                variant="contained" 
                startIcon={<Delete />} 
                className={CSSstyle.bgcolor}>Delete Profile</Button>
            
            </div>
            

            <Divider style={{marginBottom: "1em"}}  />
            <Typography variant="h5">Profie Details...</Typography>
            <form onSubmit={onFormSubmit}> 

            <TextField
                type='text'
                name="username"
                onChange={onFormChange}
                value={user ? user.username : ''}
                placeholder="Username"
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <Typography 
            variant="inherit"
            component="small"
            color="secondary">{(error.username && !user.username) ? error.username : '' }</Typography>
            
            <TextField
                type='text'
                name="name"
                onChange={onFormChange}
                value={user ? user.name : ''}
                placeholder="Full Name"
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <Typography 
            variant="inherit"
            component="small"
            color="secondary">{(error.name && !user.name) ? error.name : '' }</Typography>
            
            <TextField
                type="email"
                name="email"
                onChange={onFormChange}
                value={user ? user.email : ''}
                placeholder="example@email.com"
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <Typography 
            variant="inherit"
            component="small"
            color="secondary">{(error.email && !user.email) ? error.email : '' }</Typography>

            <TextField
                type="text"
                name="address"
                onChange={onFormChange}
                value={user ? user.address : ''}
                placeholder="Address"
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <Typography 
            variant="inherit"
            component="small"
            color="secondary">{(error.address && !user.address) ? error.address : '' }</Typography>

            <TextField
                type="text"
                name="contact"
                onChange={onFormChange}
                value={user ? user.contact : ''}
                placeholder="+(con) tact no"
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <Typography 
            variant="inherit"
            component="small"
            color="secondary">{(error.contact && !user.contact) ? error.contact : '' }</Typography>

            <TextField
                type="text"
                name="about"
                onChange={onFormChange}
                value={user ? user.about : ''}
                placeholder="tell us about you..."
                multiline
                fullWidth
                margin="normal"
                rows={3}
                variant="outlined"
            />
            <Typography 
            variant="inherit"
            component="small"
            color="secondary">{(error.about && !user.about) ? error.about : '' }</Typography>

            <RadioGroup row defaultChecked={user ? user.gender : 'female'} aria-label="gender" name="gender">
            <FormControlLabel 
                checked={ user && user.gender === 'male' ? true : false }
                name="gender"
                value="male" 
                onChange={onFormChange}
                control={<Radio />} label="Male" />
            <FormControlLabel 
                checked={ user && user.gender === 'female' ? true : false }
                name="gender"
                value="female" 
                onChange={onFormChange}
                control={<Radio />} label="Female" />
            </RadioGroup>
            
            <Button type="submit" variant="contained" className={CSSstyle.bgcolor}> Submit Details </Button>

            <Button type="reset" variant="contained" style={{margin: '1em 1em'}} color="default">Reset</Button>


            </form>
        </Container>
    )
}


EditProfileForm.propTypes = {
    auth: PropTypes.object.isRequired,
    editUser: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired
  }
  
  const mapStateToProps = state => ({
    auth: state.auth,
   
  });
  
  const mapDispatchToProps = ({ 
    editUser: editUser,
    deleteUser: deleteUser

  });

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileForm);
