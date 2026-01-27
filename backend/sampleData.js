// Sample movies data based on IMDb Top 250
// This file can be used to seed the database with initial movie data

const sampleMovies = [
  {
    title: "The Shawshank Redemption",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    rating: 9.3,
    releaseDate: "1994-09-23",
    duration: 142,
    director: "Frank Darabont",
    genre: ["Drama"],
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
    imdbId: "tt0111161"
  },
  {
    title: "The Godfather",
    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    rating: 9.2,
    releaseDate: "1972-03-24",
    duration: 175,
    director: "Francis Ford Coppola",
    genre: ["Crime", "Drama"],
    cast: ["Marlon Brando", "Al Pacino", "James Caan"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    imdbId: "tt0068646"
  },
  {
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    rating: 9.0,
    releaseDate: "2008-07-18",
    duration: 152,
    director: "Christopher Nolan",
    genre: ["Action", "Crime", "Drama"],
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
    imdbId: "tt0468569"
  },
  {
    title: "Pulp Fiction",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    rating: 8.9,
    releaseDate: "1994-10-14",
    duration: 154,
    director: "Quentin Tarantino",
    genre: ["Crime", "Drama"],
    cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    imdbId: "tt0110912"
  },
  {
    title: "Forrest Gump",
    description: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
    rating: 8.8,
    releaseDate: "1994-07-06",
    duration: 142,
    director: "Robert Zemeckis",
    genre: ["Drama", "Romance"],
    cast: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
    imdbId: "tt0109830"
  },
  {
    title: "Inception",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    rating: 8.8,
    releaseDate: "2010-07-16",
    duration: 148,
    director: "Christopher Nolan",
    genre: ["Action", "Sci-Fi", "Thriller"],
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
    imdbId: "tt1375666"
  },
  {
    title: "The Matrix",
    description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    rating: 8.7,
    releaseDate: "1999-03-31",
    duration: 136,
    director: "Lana Wachowski, Lilly Wachowski",
    genre: ["Action", "Sci-Fi"],
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
    imdbId: "tt0133093"
  },
  {
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    rating: 8.6,
    releaseDate: "2014-11-07",
    duration: 169,
    director: "Christopher Nolan",
    genre: ["Adventure", "Drama", "Sci-Fi"],
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
    imdbId: "tt0816692"
  },
  {
    title: "Fight Club",
    description: "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into something much, much more.",
    rating: 8.8,
    releaseDate: "1999-10-15",
    duration: 139,
    director: "David Fincher",
    genre: ["Drama"],
    cast: ["Brad Pitt", "Edward Norton", "Meat Loaf"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMmEzY2EwNmItZjYwZi00ZDIzLWIyMDAtN2JlYjI2ZTAzZTJjXkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_.jpg",
    imdbId: "tt0137523"
  }
];

module.exports = sampleMovies;
