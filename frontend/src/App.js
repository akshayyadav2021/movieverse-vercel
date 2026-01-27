import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext';
import { PrivateRoute } from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Search from './pages/Search';
import MovieDetails from './pages/MovieDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import AddEditMovie from './pages/AddEditMovie';
import ManageMovies from './pages/ManageMovies';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8B5CF6',      // Purple
      light: '#A78BFA',
      dark: '#6D28D9',
    },
    secondary: {
      main: '#EC4899',      // Pink accent
      light: '#F472B6',
      dark: '#BE185D',
    },
    background: {
      default: '#0F0F1E',   // Dark Navy
      paper: '#1A1A2E',     // Darker Navy
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#D1D5DB',
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px -1px rgba(139, 92, 246, 0.1), 0 2px 4px -1px rgba(139, 92, 246, 0.06)',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/" element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } />
            
            <Route path="/search" element={
              <PrivateRoute>
                <Search />
              </PrivateRoute>
            } />
            
            <Route path="/movie/:id" element={
              <PrivateRoute>
                <MovieDetails />
              </PrivateRoute>
            } />
            
            <Route path="/admin/add-movie" element={
              <PrivateRoute adminOnly={true}>
                <AddEditMovie />
              </PrivateRoute>
            } />
            
            <Route path="/admin/edit-movie/:id" element={
              <PrivateRoute adminOnly={true}>
                <AddEditMovie />
              </PrivateRoute>
            } />
            
            <Route path="/admin/movies" element={
              <PrivateRoute adminOnly={true}>
                <ManageMovies />
              </PrivateRoute>
            } />
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
