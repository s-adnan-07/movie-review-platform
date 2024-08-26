import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'

import { useAuth } from '@/contexts/AuthContext'
import useLogout from '@/hooks/useLogout'
import Box from '@mui/material/Box'

function Navbar() {
  const { user } = useAuth()
  const { handleLogout } = useLogout()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar variant="dense">
          <Box sx={{ flexGrow: 1 }}>
            <Button component={Link} to={'/'} variant="text">
              Home
            </Button>
            {user?.role == 'admin' && (
              <Button component={Link} to={'/add-movie'} variant="text">
                Add Movie
              </Button>
            )}
            {user && (
              <Button component={Link} to={'/my-reviews'} variant="text">
                My Reviews
              </Button>
            )}
          </Box>
          {user ? (
            <Button onClick={handleLogout} variant="text">
              Logout
            </Button>
          ) : (
            <Button component={Link} to={`/login`} variant="text">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
