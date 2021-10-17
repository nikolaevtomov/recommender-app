import React from 'react'
import { connect } from 'react-redux'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useHistory, useLocation } from 'react-router-dom'
import { styled } from '@mui/material/styles'

import * as actions from '../store/authActions'

const PREFIX = 'Root';

const classes = {
  root: `${PREFIX}-container`,
  avatar: `${PREFIX}-avatar`,
  form: `${PREFIX}-form`,
  submit: `${PREFIX}-submit`,
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
    backgroundColor: theme.palette.secondary.main,
  },
  [`& .${classes.form}`]: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  [`& .${classes.submit}`]: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const Login = React.memo(props => {
  const [username, setuserName] = React.useState(null)
  const [password, setPassword] = React.useState(null)

  let history = useHistory()
  let location = useLocation()
  let { from } = location.state || { from: { pathname: "/" } }

  React.useEffect(() => {
    if (props.isAuthenticated) { history.replace(from) };
  })


  const handleFormFieldChange = event => {
    switch (event.target.id) {
      case 'username': setuserName(event.target.value); break;
      case 'password': setPassword(event.target.value); break;
      default: return null;
    }
  }

  const handleSubmit = event => {
    event.preventDefault();
    props.onAuth(username, password);
  }

  return (
    <RootContainer className={classes.root} component="main" maxWidth="xs">
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>

      <Typography component="h1" variant="h5">
        Sign in
      </Typography>

      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="User Name"
          name="username"
          autoComplete="username"
          autoFocus
          onChange={handleFormFieldChange}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={handleFormFieldChange}
        />
        
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign In
        </Button>
      </form>
    </RootContainer>
  );
})

const mapDispatchToProps = dispatch => ({
  onAuth: (username, password) => dispatch(actions.authLogin(username, password))
})

export default connect(null, mapDispatchToProps)(Login)