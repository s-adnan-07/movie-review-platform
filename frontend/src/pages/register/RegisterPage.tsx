import { Link } from 'react-router-dom'

import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import useRegister from './hooks/useRegister'
import AlertStack from './components/AlertStack'

// TODO: Add validation for password and confirm password
function RegisterPage() {
  const { messages, severity, handleSubmit, handleChange } = useRegister()

  return (
    <Container maxWidth="xs" sx={{ mt: '5vh' }}>
      <Paper component="form" onSubmit={handleSubmit} onChange={handleChange}>
        <Stack>
          <Typography variant="h4" component="div" align="center">
            Register
          </Typography>

          <TextField name="name" label="name" type="text" required />
          <TextField name="email" label="email" type="email" required />

          <TextField
            name="password"
            label="password"
            type="password"
            required
          />

          <TextField
            name="confirm"
            label="confirm password"
            type="password"
            required
          />

          <Button type="submit">Register</Button>

          <Typography variant="caption">
            Already have an account ? <Link to="/login">Login</Link>
          </Typography>

          <AlertStack messages={messages} severity={severity} />
        </Stack>
      </Paper>
    </Container>
  )
}

export default RegisterPage
