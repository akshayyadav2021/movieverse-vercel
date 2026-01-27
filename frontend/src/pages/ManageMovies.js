import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { movieService } from '../services';
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MovieCard from '../components/MovieCard';

const ManageMovies = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteDialog, setDeleteDialog] = useState({ open: false, movieId: null });

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const data = await movieService.getMovies(1, 100);
      setMovies(data.movies);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (movie) => {
    navigate(`/admin/edit-movie/${movie._id}`);
  };

  const handleDeleteClick = (movieId) => {
    setDeleteDialog({ open: true, movieId });
  };

  const handleDeleteConfirm = async () => {
    try {
      await movieService.deleteMovie(deleteDialog.movieId);
      setMovies(movies.filter(m => m._id !== deleteDialog.movieId));
      setDeleteDialog({ open: false, movieId: null });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete movie');
      setDeleteDialog({ open: false, movieId: null });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, movieId: null });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h3" component="h1">
          Manage Movies
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/admin/add-movie')}
        >
          Add New Movie
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {movies.map((movie) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={movie._id}>
                <MovieCard
                  movie={movie}
                  onEdit={handleEdit}
                  onDelete={handleDeleteClick}
                  showActions={true}
                />
              </Grid>
            ))}
          </Grid>

          {movies.length === 0 && (
            <Typography variant="h6" align="center" sx={{ mt: 4 }}>
              No movies found. Add your first movie!
            </Typography>
          )}
        </>
      )}

      <Dialog open={deleteDialog.open} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this movie? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ManageMovies;
