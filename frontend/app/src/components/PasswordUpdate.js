import React from 'react'
import axios from 'axios'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import { styled } from '@mui/material/styles'
import { Avatar, Button, Container, TextField, Typography } from '@mui/material'

import * as settings from '../settings'

const PREFIX = 'Root';

const classes = {
  root: `${PREFIX}-container`,
  avatar: `${PREFIX}-avatar`,
  form: `${PREFIX}-form`,
  submit: `${PREFIX}-submit`,
  success: `${PREFIX}-success`,
  input: `${PREFIX}-input`,
}

const RootContainer = styled(Container)(({ theme }) => ({
  [`&.${classes.root}`]: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  [`& .${classes.avatar}`]: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.success.main,
  },
  [`& .${classes.form}`]: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  [`& .${classes.submit}`]: {
    margin: theme.spacing(3, 0, 2),
  },
  [`& .${classes.success}`]: {
    color: theme.palette.success.main,
  },
}));

const PasswordUpdate = React.memo(props => {
  const [new_password1, setNewPassword1] = React.useState(null);
  const [new_password2, setNewPassword2] = React.useState(null);
  const [success, setSuccess] = React.useState(false);

  const handleFormFieldChange = event => {
    setSuccess(false);

    switch (event.target.id) {
      case 'new_password1': setNewPassword1(event.target.value); break;
      case 'new_password2': setNewPassword2(event.target.value); break;
      default: return null;
    }
  };

  const handleSubmit = event => {
    event.preventDefault()

    if (new_password1 !== new_password2) {
      alert("Passwords don't match")
    } else {
      let headers = { 'Authorization': `Token ${props.token}` }
      let method = 'post'
      let url = settings.API_SERVER + '/api/auth/update_password/'
      let passwordFormData = new FormData()
      passwordFormData.append("new_password1", new_password1)
      passwordFormData.append("new_password2", new_password2)
      let config = { headers, method, url, data: passwordFormData}

      axios(config).then(res => {
        setSuccess(true);
      }).catch(
        error => {
          alert(error)
        })
    }
  }

  return (
    <RootContainer className={classes.root} component="main" maxWidth="xs">
      {success ? <Typography variant="button" className={classes.success} gutterBottom>Password update successful!</Typography> : null}

      <Avatar className={classes.avatar}>
        <VpnKeyIcon />
      </Avatar>

      <Typography component="h1" variant="h5">
        Update Password
      </Typography>

      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="new_password1"
          label="Enter New Password"
          type="password"
          id="new_password1"
          onChange={handleFormFieldChange}
          error={new_password1 !== new_password2}
          helperText={new_password1 !== new_password2 ? "Passwords don't match" : null}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="new_password2"
          label="Enter Your Password Again"
          type="password"
          id="new_password2"
          onChange={handleFormFieldChange}
          error={new_password1 !== new_password2}
          helperText={new_password1 !== new_password2 ? "Passwords don't match" : null}
        />
        
        <Button
          type="submit"
          fullWidth
          variant="contained"
          className={classes.submit}
        >
          Update Password
        </Button>
      </form>
    </RootContainer>
  );
})

export default PasswordUpdate