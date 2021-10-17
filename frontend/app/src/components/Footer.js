import React from 'react'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { styled } from '@mui/material/styles'
import { grey } from '@mui/material/colors'

const PREFIX = 'Root';

const classes = {
  root: `${PREFIX}-container`,
}

const RootTypography = styled(Typography)(({ theme }) => ({
  [`&.${classes.root}`]: {
    marginBottom: theme.spacing(4),
  },
}))

const Footer = React.memo(() => {
  return (
    <RootTypography 
      style={{ 'fontWeight': 200 }}
      color={grey[400]}
      variant="body2"
      className={classes.root}
      align="center"
    >
      {'Copyright © '}

      <Link color="inherit" href="https://material-ui.com/">
        Movie Recommender
      </Link>{' '}

      {new Date().getFullYear()}
      
      {'.'}
    </RootTypography>
  );
})

export default Footer