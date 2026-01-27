import api from './api';

export const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  register: async (name, email, password, role = 'user') => {
    const response = await api.post('/auth/register', { name, email, password, role });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
};

export const movieService = {
  getMovies: async (page = 1, limit = 10, search = '', sortBy = 'createdAt', sortOrder = 'desc') => {
    const response = await api.get('/movies', {
      params: { page, limit, search, sortBy, sortOrder }
    });
    return response.data;
  },

  getMovie: async (id) => {
    const response = await api.get(`/movies/${id}`);
    return response.data;
  },

  createMovie: async (movieData) => {
    const response = await api.post('/movies', movieData);
    return response.data;
  },

  updateMovie: async (id, movieData) => {
    const response = await api.put(`/movies/${id}`, movieData);
    return response.data;
  },

  deleteMovie: async (id) => {
    const response = await api.delete(`/movies/${id}`);
    return response.data;
  }
};
