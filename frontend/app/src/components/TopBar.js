import React from 'react'
import AccountCircle from '@mui/icons-material/AccountCircle'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import { common } from '@mui/material/colors'

const PREFIX = 'Root';

const classes = {
  root: `${PREFIX}-root`,
  menuButton: `${PREFIX}-menuButton`,
  title: `${PREFIX}-title`,
  account: `${PREFIX}-account`,
  accountButton: `${PREFIX}-accountButton`,
  link: `${PREFIX}-link`,
}

const RootAppBar = styled(AppBar)(({ theme }) => ({
  [`&.${classes.root}`]: {
    flexGrow: 1,
    backgroundColor: '#19212d',
  },
  [`& .${classes.menuButton}`]: {
    marginRight: theme.spacing(2),
  },
  [`& .${classes.title}`]: {
    flexGrow: 1,
    '&::before': {
      content: '""',
      background: 'url(data:image/png;base64,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)',
      repeat: 'no-repeat',
      backgroundSize: 'contain',
      width: 40,
      height: 40,
      display: 'block',
      marginTop: -8,
      float: 'left',
      marginRight: 12,
    },
    [`& .${classes.account}`]: {
      marginTop: 14
    },
    [`& .${classes.accountButton}`]: {
      width: 40,
      height: 40,
    },
    [`& .${classes.link}`]: {
      textDecoration: 'none',
      color: common.white,
    },
  },
}))

const TopBar = React.memo(props => {
  return (
    <RootAppBar className={classes.root} position="static">
      <Toolbar className={classes.root}>

        <Typography variant="h6" className={classes.title}>
          <a href="/" className={classes.link}>
            Movie Recommender
          </a>
        </Typography>

        {props.isAuthenticated ?
          <Button className={classes.accountButton} href="/update-password/">
            <AccountCircle style={{ fill: '#ffffff' }} />
          </Button> : null }

        {props.isAuthenticated ?
          <Button onClick={() => props.logout()}>
            <LockOutlinedIcon style={{ fill: '#ffffff' }} />
          </Button> : null }
      </Toolbar>
    </RootAppBar>
  )
})

export default TopBar
