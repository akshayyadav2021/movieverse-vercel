import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { movieService } from '../services';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  Grid,
  Chip,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

const AddEditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    rating: '',
    releaseDate: '',
    duration: '',
    director: '',
    posterUrl: '',
    imdbId: ''
  });
  const [genres, setGenres] = useState([]);
  const [genreInput, setGenreInput] = useState('');
  const [cast, setCast] = useState([]);
  const [castInput, setCastInput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      fetchMovie();
    }
  }, [id]);

  const fetchMovie = async () => {
    try {
      const data = await movieService.getMovie(id);
      setFormData({
        title: data.title,
        description: data.description,
        rating: data.rating,
        releaseDate: data.releaseDate.split('T')[0],
        duration: data.duration,
        director: data.director,
        posterUrl: data.posterUrl || '',
        imdbId: data.imdbId || ''
      });
      setGenres(data.genre || []);
      setCast(data.cast || []);
    } catch (err) {
      setError('Failed to fetch movie details');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddGenre = () => {
    if (genreInput.trim() && !genres.includes(genreInput.trim())) {
      setGenres([...genres, genreInput.trim()]);
      setGenreInput('');
    }
  };

  const handleRemoveGenre = (genreToRemove) => {
    setGenres(genres.filter(g => g !== genreToRemove));
  };

  const handleAddCast = () => {
    if (castInput.trim() && !cast.includes(castInput.trim())) {
      setCast([...cast, castInput.trim()]);
      setCastInput('');
    }
  };

  const handleRemoveCast = (castToRemove) => {
    setCast(cast.filter(c => c !== castToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (genres.length === 0) {
      setError('Please add at least one genre');
      return;
    }

    setLoading(true);

    try {
      const movieData = {
        ...formData,
        rating: parseFloat(formData.rating),
        duration: parseInt(formData.duration),
        genre: genres,
        cast: cast
      };

      if (isEditMode) {
        await movieService.updateMovie(id, movieData);
      } else {
        await movieService.createMovie(movieData);
      }
      
      navigate('/admin/movies');
    } catch (err) {
      setError(err.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'create'} movie`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {isEditMode ? 'Edit Movie' : 'Add New Movie'}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Rating"
                name="rating"
                type="number"
                inputProps={{ min: 0, max: 10, step: 0.1 }}
                value={formData.rating}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Duration (minutes)"
                name="duration"
                type="number"
                inputProps={{ min: 1 }}
                value={formData.duration}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Release Date"
                name="releaseDate"
                type="date"
                value={formData.releaseDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Director"
                name="director"
                value={formData.director}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Poster URL"
                name="posterUrl"
                value={formData.posterUrl}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="IMDb ID"
                name="imdbId"
                value={formData.imdbId}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <TextField
                  fullWidth
                  label="Add Genre"
                  value={genreInput}
                  onChange={(e) => setGenreInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddGenre())}
                />
                <Button
                  variant="contained"
                  onClick={handleAddGenre}
                  startIcon={<AddIcon />}
                >
                  Add
                </Button>
              </Box>
              <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {genres.map((genre, index) => (
                  <Chip
                    key={index}
                    label={genre}
                    onDelete={() => handleRemoveGenre(genre)}
                    deleteIcon={<CloseIcon />}
                  />
                ))}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <TextField
                  fullWidth
                  label="Add Cast Member"
                  value={castInput}
                  onChange={(e) => setCastInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCast())}
                />
                <Button
                  variant="contained"
                  onClick={handleAddCast}
                  startIcon={<AddIcon />}
                >
                  Add
                </Button>
              </Box>
              <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {cast.map((member, index) => (
                  <Chip
                    key={index}
                    label={member}
                    onDelete={() => handleRemoveCast(member)}
                    deleteIcon={<CloseIcon />}
                  />
                ))}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/admin/movies')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : isEditMode ? 'Update Movie' : 'Add Movie'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AddEditMovie;
