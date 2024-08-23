import { Link } from 'react-router-dom'

import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

function LoginPage() {
  return (
    <Container maxWidth="xs" sx={{ mt: '20vh' }}>
      <Paper component="form">
        <Stack>
          <Typography variant="h4" component="div" align="center">
            Login
          </Typography>

          <TextField label="email" type="text" required />
          <TextField label="password" type="password" required />

          <Button type="submit">Login</Button>
          <Typography variant="caption">
            Don't have an account ? <Link to="/register">Register</Link>
          </Typography>
        </Stack>
      </Paper>
    </Container>
  )
}

export default LoginPage
