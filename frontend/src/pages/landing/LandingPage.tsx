import { Link } from 'react-router-dom'

import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import useMediaQuery from '@mui/material/useMediaQuery'
import IconButton from '@mui/material/IconButton'
import Info from '@mui/icons-material/Info'

import Loading from '@/components/Loading'
import NotFound from '@/components/NotFound'
import useMovies from './hooks/useMovies'

import img from '@/assets/movie.webp'

function LandingPage() {
  const matches = useMediaQuery('(min-width:800px)')
  const { movies, isLoading } = useMovies()

  if (isLoading) return <Loading />
  if (!movies) return <NotFound />

  return (
    <ImageList cols={matches ? 4 : 2} gap={20}>
      {movies.map(movie => (
        <ImageListItem key={movie._id}>
          <img src={img} loading="lazy" />
          <ImageListItemBar
            title={movie.name}
            actionIcon={
              <IconButton component={Link} to={`/movies/${movie._id}`}>
                <Info />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  )
}

export default LandingPage
