import { Link } from 'react-router-dom'

import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'

import NotFound from '@/components/NotFound'
import useMovie from './hooks/useMovie'
import img from '@/assets/movie.webp'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Loading from '@/components/Loading'

function MoviePage() {
  const { movie, id, isLoading } = useMovie()

  if (isLoading) return <Loading />
  if (!movie) return <NotFound />

  return (
    <Paper sx={{ mt: '20px', p: 2 }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'center', md: 'start' }}
        spacing={2}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <img src={img} width="50%" />
        <Stack width="50%">
          <Typography variant="h1" fontWeight={900}>
            {movie.name}
          </Typography>
          <Typography variant="body1">Genre: {movie.genre}</Typography>
          <Typography variant="body1">{movie.description}</Typography>
          <Button component={Link} to={`/movies/${id}/add-review`}>
            Add Review
          </Button>
          <Button component={Link} to={`/movies/${id}/reviews`}>
            Reviews
          </Button>
        </Stack>
      </Stack>
    </Paper>
  )
}

export default MoviePage
