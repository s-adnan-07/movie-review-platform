import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

import useMovieReviews from './hooks/useMovieReviews'
import NotFound from '@/components/NotFound'
import Loading from '@/components/Loading'

function MovieReviewsPage() {
  const { reviews, isLoading } = useMovieReviews()

  if (isLoading) return <Loading />
  if (!reviews) return <NotFound />

  return (
    <Container maxWidth="md">
      <Stack sx={{ mt: 5 }}>
        {reviews.map(review => (
          <Paper key={review._id}>
            <Stack spacing={2}>
              <Stack direction="row" spacing={1}>
                <AccountCircleIcon />
                <Typography variant="body1">{review.userName}</Typography>
              </Stack>
              <Rating value={review.rating} readOnly sx={{ mt: '10px' }} />
              <Typography variant="body1">{review.feedback}</Typography>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Container>
  )
}

export default MovieReviewsPage
