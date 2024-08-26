import AlertStack from '@/components/AlertStack'
import useAddMovieReview from '@/hooks/useAddMovieReview'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Rating from '@mui/material/Rating'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'

const labels: { [index: number]: string } = {
  1: 'very poor',
  2: 'poor',
  3: 'average',
  4: 'good',
  5: 'excellent',
}

function AddMovieReviewPage() {
  const {
    review: { rating },
    hover,
    messages,
    severity,
    handleChange,
    handleSubmit,
    handleHover,
  } = useAddMovieReview()

  return (
    <Container maxWidth="md">
      <Paper
        component="form"
        sx={{ mt: 10, p: 2 }}
        onChange={handleChange}
        onSubmit={handleSubmit}
      >
        <Stack>
          <Rating
            name="rating"
            getLabelText={v => labels[v]}
            value={rating}
            onChangeActive={handleHover}
          />
          {rating !== null && (
            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : rating]}</Box>
          )}
          <TextField
            name="feedback"
            type="text"
            label="Review"
            multiline
            rows={10}
            required
          />
          <Button type="submit">Submit</Button>
          <AlertStack messages={messages} severity={severity} />
        </Stack>
      </Paper>
    </Container>
  )
}

export default AddMovieReviewPage
