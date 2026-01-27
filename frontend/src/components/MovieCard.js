import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  Chip,
  Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const MovieCard = ({ movie, onEdit, onDelete, showActions }) => {
  const navigate = useNavigate();

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="300"
        image={movie.posterUrl || 'https://via.placeholder.com/300x450?text=No+Image'}
        alt={movie.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {movie.title}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <StarIcon sx={{ color: 'gold', mr: 0.5 }} />
          <Typography variant="body2" color="text.secondary">
            {movie.rating}/10
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <CalendarTodayIcon sx={{ fontSize: 16, mr: 0.5 }} />
          <Typography variant="body2" color="text.secondary">
            {formatDate(movie.releaseDate)}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5 }} />
          <Typography variant="body2" color="text.secondary">
            {movie.duration} min
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {movie.description.substring(0, 100)}...
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {movie.genre.slice(0, 3).map((g, index) => (
            <Chip key={index} label={g} size="small" />
          ))}
        </Box>
      </CardContent>
      
      <CardActions>
        <Button size="small" onClick={() => navigate(`/movie/${movie._id}`)}>
          View Details
        </Button>
        {showActions && (
          <>
            <Button size="small" color="primary" onClick={() => onEdit(movie)}>
              Edit
            </Button>
            <Button size="small" color="error" onClick={() => onDelete(movie._id)}>
              Delete
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default MovieCard;
