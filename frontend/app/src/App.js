import React from 'react'
import { connect } from 'react-redux'
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material'

import Urls from './Urls'
import Layout from './components/Layout'
import * as actions from './store/authActions'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#343a40',
    },
    background: {
      default: '#020916',
    },
    yellow: {
      main: '#ffbb2f',
      contrastText: '#343a40',
    },
  },
})

const App = React.memo(props => {
  const { setAuthenticatedIfRequired } = props

  React.useEffect(() => setAuthenticatedIfRequired(), [setAuthenticatedIfRequired])

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
				
        <Layout {...props}>
          <Urls {...props}/>
        </Layout>
      </ThemeProvider>
    </StyledEngineProvider>
  );
})

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null && typeof state.auth.token !== 'undefined',
  token: state.auth.token,
})

const mapDispatchToProps = dispatch => ({
  setAuthenticatedIfRequired: () => dispatch(actions.authCheckState()),
  logout: () => dispatch(actions.authLogout()) 
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
