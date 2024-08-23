import Container from '@mui/material/Container'
import Navbar from './Navbar'

type Props = {
  children: React.ReactNode
}

function Layout({ children }: Props) {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg">{children}</Container>
    </>
  )
}

export default Layout
