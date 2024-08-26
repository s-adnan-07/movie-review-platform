import { Route, Routes } from 'react-router-dom'

import Layout from './components/Layout'
import PrivateRoutes from './components/PrivateRoutes'

import LoginPage from './pages/login/LoginPage'
import RegisterPage from './pages/register/RegisterPage'
import LandingPage from './pages/landing/LandingPage'
import MoviePage from './pages/movie/MoviePage'
import AddMovieReviewPage from './pages/movie/AddMovieReviewPage'
import AddMoviePage from './pages/movie/AddMoviePage'
import MovieReviewsPage from './pages/movie/MovieReviewsPage'
import AdminRoutes from './components/AdminRoutes'
import UserReviewsPage from './pages/reviews/UserReviewsPage'

function App() {
  // TODO: navigate '/' and '/movies' to same page
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/movies" element={<LandingPage />} />
        <Route path="/movies/:id" element={<MoviePage />} />
        <Route path="/movies/:id/reviews" element={<MovieReviewsPage />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/my-reviews" element={<UserReviewsPage />} />
          <Route
            path="/movies/:id/add-review"
            element={<AddMovieReviewPage />}
          />
        </Route>

        <Route element={<AdminRoutes />}>
          <Route path="/add-movie" element={<AddMoviePage />} />
        </Route>
      </Routes>
    </Layout>
  )
}

export default App
