const NodeCache = require('node-cache');


const cache = new NodeCache({
  stdTTL: 300, 
  checkperiod: 60, 
  useClones: false
});


const CACHE_KEYS = {
  ALL_MOVIES: 'all_movies',
  MOVIE_BY_ID: 'movie_',
  SEARCH_RESULTS: 'search_',
  SORTED_MOVIES: 'sorted_'
};


const generateCacheKey = (prefix, params) => {
  return `${prefix}${JSON.stringify(params)}`;
};

const clearMovieCache = () => {
  const keys = cache.keys();
  keys.forEach(key => {
    if (key.startsWith(CACHE_KEYS.ALL_MOVIES) || 
        key.startsWith(CACHE_KEYS.SEARCH_RESULTS) || 
        key.startsWith(CACHE_KEYS.SORTED_MOVIES)) {
      cache.del(key);
    }
  });
};

module.exports = {
  cache,
  CACHE_KEYS,
  generateCacheKey,
  clearMovieCache
};
