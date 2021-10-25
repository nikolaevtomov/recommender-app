import React from 'react'
import axios from 'axios'
import { styled } from '@mui/material/styles'
import { useParams, Link, useHistory } from 'react-router-dom'
import useAxios from 'axios-hooks'
import {
  Container,
  Grid,
  Typography,
  Pagination,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Badge,
} from '@mui/material'
import { grey } from '@mui/material/colors'

import * as settings from '../settings'

const DEFAULT_PAGE = 1
const ITEMS_PER_PAGE = 12
// const POSTER_PATH = 'https://www.themoviedb.org/t/p/w1280'
// const BLANK_POSTER_PATH = 'https://critics.io/img/movies/poster-placeholder.png'
const POSTER_PATH = ''
const BLANK_POSTER_PATH = ''

const PREFIX = 'Root';

const classes = {
  root: `${PREFIX}-container`,
  title: `${PREFIX}-title`,
  paginationGrid: `${PREFIX}-paginationGrid`,
  pagination: `${PREFIX}-pagination`,
  cardGrid: `${PREFIX}-cardGrid`,
  card: `${PREFIX}-card`,
  badge: `${PREFIX}-badge`,
}

const RootContainer = styled(Container)(({ theme }) => ({
  [`&.${classes.root}`]: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  [`& .${classes.title}`]: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    width: '100%',
    textAlign: 'center',
  },
  [`& .${classes.paginationGrid}`]: {
    display: 'flex',
    flex: 1,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    width: '100%',
    textAlign: 'center',
  },
  [`& .${classes.pagination}`]: {
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
  },
  [`& .${classes.cardGrid}`]: {
    display: "flex",
    textDecoration: 'none',
  },
  [`& .${classes.card}`]: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  [`& .${classes.badge}`]: {
    top: theme.spacing(3),
    right: theme.spacing(3),
    fontSize: 20,
  }
}))

const Home = React.memo(props => {
  const { page } = useParams()
  const history = useHistory()

  const [movies, setMovies] = React.useState({
    count: 0,
    next: null,
    previous: null,
    results: []
  })

  const getMovies = React.useCallback(pn => {
    let headers = { 'Authorization': `Token ${props.token}` }
    let url = settings.API_SERVER + `/api/movies/?page=${Boolean(Number(pn)) ? Number(pn) : DEFAULT_PAGE}`
    let method = 'get'
    let config = { headers, method, url, data: {} }

    axios(config).then(
      res => {
        setMovies(res.data)
      }).catch(
        error => alert(error))
  }, [props.token])

  React.useEffect(() => getMovies(page), [getMovies, page])

  // eslint-disable-next-line
  const [{ data, loading, error }] = useAxios({
    headers: { 'Authorization': `Token ${props.token}` },
    url: settings.API_SERVER + '/api/top_rated/',
    method: 'get',
  })

  const handlePaginationChange = (event, value) => {
    history.push(`/${value}/`)
  }

  const generateCount = () => {
    return Math.ceil(movies.count / ITEMS_PER_PAGE)
  }

  const generatePosterPath = movie => {
    if (movie.poster_path) {
      return `${POSTER_PATH}${movie.poster_path}`
    } else {
      return BLANK_POSTER_PATH
    }
  }

  return (
    <React.Fragment>
        <RootContainer className={classes.root}>
          <Grid container spacing={2} sx={{ mb: 3 }} alignItems="stretch"> 
            <Grid item xs={12}> 
              <Typography sx={{ mb: 2 }} variant="h5" style={{ 'fontWeight': 200 }} color={grey[200]}>
                Top Ratings
              </Typography>

              <Grid container spacing={2}>
                  {
                    data?.map(movie =>
                      <Grid
                        key={movie.id}
                        item
                        component={Link}
                        to={`details/${movie.id}/`}
                        xs={6}
                        md={4}
                        lg={2}
                        className={classes.cardGrid}
                      >
                        <Card raised className={classes.card}>
                          <Badge
                            color="yellow"
                            className={classes.badge}
                            badgeContent={movie.vote_average}
                          />

                          <CardActionArea>
                              <CardMedia
                                component="img"
                                height="200"
                                image={generatePosterPath(movie)}
                                // image={null}
                                alt={movie.title}
                              />

                              <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="body2"
                                    component="div"
                                >
                                    {movie.title}
                                </Typography>

                                <Typography style={{ 'fontWeight': 200 }} color={grey[300]} variant="caption">
                                    {movie.genres}
                                </Typography>
                              </CardContent>
                          </CardActionArea>
                        </Card>
                      </Grid>
                    )
                  }
              </Grid>
            </Grid>
          </Grid>

          <Grid container spacing={2} alignItems="stretch">  
            <Grid item> 
              <Typography sx={{ mb: 2 }} variant="h5" style={{ 'fontWeight': 200 }} color={grey[200]}>
                Latest movies
              </Typography>

              <Grid container spacing={2}>
                {
                  movies.results.map(movie =>
                    <Grid
                      key={movie.id}
                      item
                      component={Link}
                      to={`/details/${movie.id}/`}
                      xs={6}
                      md={4}
                      lg={2}
                      className={classes.cardGrid}
                    >
                      <Card raised className={classes.card}>
                        <Badge
                          color="yellow"
                          className={classes.badge}
                          badgeContent={movie.vote_average}
                        />

                        <CardActionArea>
                            <CardMedia
                              component="img"
                              height="200"
                              image={movie ? generatePosterPath(movie) : null}
                              // image={null}
                              alt={movie.title}
                            />

                            <CardContent>
                              <Typography
                                  gutterBottom
                                  variant="body2"
                                  component="div"
                              >
                                  {movie.title}
                              </Typography>

                              <Typography style={{ 'fontWeight': 200 }} color={grey[300]} variant="caption">
                                  {movie.genres}
                              </Typography>
                            </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  )
                }
              </Grid>
            </Grid>
          </Grid>
            
          <Grid container>
            <Grid className={classes.paginationGrid}>
              <Pagination
                className={classes.pagination}
                count={generateCount()}
                onChange={handlePaginationChange}
                showFirstButton
                showLastButton 
                color="primary"
                page={Boolean(Number(page)) ? Number(page) : DEFAULT_PAGE}
              />
            </Grid>
          </Grid>
        </RootContainer>
    </React.Fragment>
  )
})

export default Home