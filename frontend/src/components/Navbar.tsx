import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

function Navbar() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h5" fontWeight={700}>
          Home
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
