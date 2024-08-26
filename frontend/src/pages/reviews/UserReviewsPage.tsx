import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'

import useReviews from './hooks/useReviews'
import NotFound from '@/components/NotFound'
import Loading from '@/components/Loading'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import { useState } from 'react'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'

function UserReviewsPage() {
  const { reviews, isLoading } = useReviews()
  const [open, setopen] = useState(false)

  if (isLoading) return <Loading />
  if (!reviews) return <NotFound />

  return (
    <Container maxWidth="md">
      <Stack sx={{ mt: 5 }}>
        {reviews.map(review => (
          <Paper key={review._id}>
            <Stack spacing={2}>
              <Rating value={review.rating} readOnly sx={{ mt: '10px' }} />
              <Typography variant="body1">{review.feedback}</Typography>
              <Stack direction="row">
                <Button color="success" fullWidth>
                  Edit
                </Button>
                <Button color="error" fullWidth onClick={() => setopen(true)}>
                  Delete
                </Button>
              </Stack>
            </Stack>
          </Paper>
        ))}
      </Stack>
      <Dialog open={open} onClose={() => setopen(false)}>
        <DialogTitle>Delete this review ?</DialogTitle>
        <DialogContent>
          Do you wish to delete the selected review? This action cannot be
          reversed.
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={() => setopen(false)}>
            Yes
          </Button>
          <Button color="secondary" onClick={() => setopen(false)} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default UserReviewsPage
