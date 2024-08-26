import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'

import useAddMovie from './hooks/useAddMovie'
import AlertStack from '@/components/AlertStack'
import { GENRES } from '@/constants'

function AddMoviePage() {
  const {
    movie,
    messages,
    severity,
    handleChange,
    handleSubmit,
    handleSelectChange,
  } = useAddMovie()

  return (
    <Container maxWidth="md">
      <Paper
        component="form"
        sx={{ mt: '25px', p: 2 }}
        onChange={handleChange}
        onSubmit={handleSubmit}
      >
        <Stack>
          <TextField name="name" label="Title" type="text" />
          <TextField
            name="description"
            label="Description"
            type="text"
            multiline
            rows={10}
          />
          <InputLabel>Genre</InputLabel>
          <Select
            name="genre"
            label="Genre"
            value={movie.genre}
            onChange={handleSelectChange}
          >
            {GENRES.map((genreValue, i) => (
              <MenuItem key={i} value={genreValue}>
                {genreValue}
              </MenuItem>
            ))}
          </Select>
          <Button type="submit">Submit</Button>
          <AlertStack messages={messages} severity={severity} />
        </Stack>
      </Paper>
    </Container>
  )
}

export default AddMoviePage
