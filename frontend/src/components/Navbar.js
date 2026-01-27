import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MovieIcon from '@mui/icons-material/Movie';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <MovieIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <RouterLink to="/" style={{ color: 'white', textDecoration: 'none' }}>
            MovieVerse
          </RouterLink>
        </Typography>
        
        {user ? (
          <Box>
            <Button color="inherit" component={RouterLink} to="/">
              Home
            </Button>
            <Button color="inherit" component={RouterLink} to="/search">
              Search
            </Button>
            {isAdmin() && (
              <>
                <Button color="inherit" component={RouterLink} to="/admin/add-movie">
                  Add Movie
                </Button>
                <Button color="inherit" component={RouterLink} to="/admin/movies">
                  Manage Movies
                </Button>
              </>
            )}
            <Button color="inherit" onClick={handleLogout}>
              Logout ({user.name})
            </Button>
          </Box>
        ) : (
          <Box>
            <Button color="inherit" component={RouterLink} to="/login">
              Login
            </Button>
            <Button color="inherit" component={RouterLink} to="/register">
              Register
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
