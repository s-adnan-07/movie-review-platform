import { Link } from 'react-router-dom'

import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

function RegisterPage() {
  return (
    <Container maxWidth="xs" sx={{ mt: '10vh' }}>
      <Paper component="form">
        <Stack>
          <Typography variant="h4" component="div" align="center">
            Register
          </Typography>

          <TextField label="name" type="" required />
          <TextField label="email" type="email" required />
          <TextField label="password" type="password" required />
          <TextField label="confirm password" type="password" required />

          <Button type="submit">Register</Button>
          <Typography variant="caption">
            Already have an account ? <Link to="/login">Login</Link>
          </Typography>
        </Stack>
      </Paper>
    </Container>
  )
}

export default RegisterPage
