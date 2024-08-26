import { Link } from 'react-router-dom'

import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import AlertStack from '@/components/AlertStack'
import useLogin from './hooks/useLogin'

function LoginPage() {
  const {
    messages,
    severity,
    isLoading,
    isSuccess,
    handleSubmit,
    handleChange,
  } = useLogin()

  return (
    <Container maxWidth="xs" sx={{ mt: '15vh' }}>
      <Paper component="form" onChange={handleChange} onSubmit={handleSubmit}>
        <Stack>
          <Typography variant="h4" component="div" align="center">
            Login
          </Typography>

          <TextField name="email" label="email" type="text" required />
          <TextField
            name="password"
            label="password"
            type="password"
            required
          />

          <Button type="submit" disabled={isLoading || isSuccess}>
            Login
          </Button>
          <Typography variant="caption">
            Don't have an account ? <Link to="/register">Register</Link>
          </Typography>

          <AlertStack messages={messages} severity={severity} />
        </Stack>
      </Paper>
    </Container>
  )
}

export default LoginPage
