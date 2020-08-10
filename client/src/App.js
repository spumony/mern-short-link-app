import React from 'react'
import { Container } from 'reactstrap'
import {BrowserRouter as Router} from 'react-router-dom'
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Loader from './components/Loader'

function App() {
  const {token, login, logout, userId, ready} = useAuth()
  const isAuthenticated = !!token // !! make it boolean type
  const routes = useRoutes(isAuthenticated)

  if (!ready) {
    return <Loader />
  }

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      <Router>
        { isAuthenticated && <Navbar />}
        <Container>
          {routes}
        </Container>
      </Router>
    </AuthContext.Provider>
  );
}

export default App
