import { Route, Routes } from 'react-router-dom'

import Layout from './components/Layout'
import PrivateRoutes from './components/PrivateRoutes'

import LoginPage from './pages/login/LoginPage'
import RegisterPage from './pages/register/RegisterPage'
import LandingPage from './pages/landing/LandingPage'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<LandingPage />} />
        </Route>
      </Routes>
    </Layout>
  )
}

export default App
