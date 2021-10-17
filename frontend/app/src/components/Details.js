import React from 'react'
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Badge,
  Rating,
  Stack,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import useAxios from 'axios-hooks'
import { styled } from '@mui/material/styles'
import { grey } from '@mui/material/colors'

import * as settings from '../settings'

// const POSTER_PATH = 'https://www.themoviedb.org/t/p/w1280'
// const BLANK_POSTER_PATH = 'https://critics.io/img/movies/poster-placeholder.png'
const POSTER_PATH = ''
const BLANK_POSTER_PATH = ''

const PREFIX = 'Root';

const classes = {
  root: `${PREFIX}-root`,
  cardGrid: `${PREFIX}-cardGrid`,
  card: `${PREFIX}-card`,
  badge: `${PREFIX}-badge`,
}

const RootContainer = styled(Container)(({ theme }) => ({
  [`&.${classes.root}`]: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  [`& .${classes.badge}`]: {
    top: theme.spacing(3),
    right: theme.spacing(3),
    fontSize: 20,
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
}));

const Details = React.memo(props => {
  const { id } = useParams()
  // eslint-disable-next-line
  const [{ data, loading, error }] = useAxios({
    headers: { 'Authorization': `Token ${props.token}` },
    url: settings.API_SERVER + `/api/details/${ id }/`,
    method: 'get',
  })

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
        <Grid container spacing={2} alignItems="stretch">
          <Grid item md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                  <CardMedia
                    component="img"
                    height="400"
                    image={data ? generatePosterPath(data) : null}
                    // image={null}
                    alt={data?.title}
                  />
              </Grid>

              <Grid item xs={12} md={8}>
                <Typography sx={{ mb: 2 }} variant="h5">
                  {data?.title}
                </Typography>
                
                <Stack direction="row" sx={{ mb: 2, alignItems: 'center', display: 'flex' }} spacing={1}>
                  <Typography color={grey[600]} variant="body2">{data?.vote_average}</Typography>
                  <Rating name="read-only" value={data?.vote_average / 2} precision={0.5} defaultValue={0} readOnly />
                  <Typography color={grey[600]} variant="body2"> {data?.vote_count} votes </Typography>
                  <Typography color={grey[600]} variant="body2">&bull;</Typography>
                  <Typography color={grey[600]} variant="body2">{data?.runtime} min</Typography>
                </Stack>

                <Typography color={grey[600]} sx={{ mb: 2 }} variant="body2">
                  {data?.overview}
                </Typography>

                <Grid container sx={{ mb: 1 }} spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Typography color={grey[600]} variant="body2">
                      Genres
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={8}>
                    <Typography color={grey[500]} variant="body2">
                      {data?.genres || 'N/A'}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container sx={{ mb: 1 }} spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Typography color={grey[600]} variant="body2">
                      Director
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={8}>
                    <Typography color={grey[500]} variant="body2">
                      {data?.director || 'N/A'}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container sx={{ mb: 1 }} spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Typography color={grey[600]} variant="body2">
                      Release
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={8}>
                    <Typography color={grey[500]} variant="body2">
                      {data?.release_date || 'N/A'}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container sx={{ mb: 1 }} spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Typography color={grey[600]} variant="body2">
                      Tags
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={8}>
                    <Typography color={grey[500]} variant="body2">
                      {data?.tagline || 'N/A'}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container sx={{ mb: 1 }} spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Typography color={grey[600]} variant="body2">
                      Cast
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={8}>
                    <Typography color={grey[500]} variant="body2">
                      {data?.cast || 'N/A'}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item md={4}>
            <Typography sx={{ mb: 2 }} variant="h5" style={{ 'fontWeight': 200 }} color={grey[200]}>
              You may also like
            </Typography>

            <Grid container spacing={2}>
              {
                data?.you_may_also_like?.map(movie =>
                  <Grid
                    key={movie.id}
                    item
                    component={Link}
                    to={`/details/${movie.id}/`}
                    xs={6}
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
      </RootContainer>
    </React.Fragment>
  );
})

export default Details