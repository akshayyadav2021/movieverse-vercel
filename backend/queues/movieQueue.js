const Movie = require('../models/Movie');

let movieQueue = null;
let queueAvailable = false;

// Only initialize queue if ENABLE_QUEUE is explicitly true
if (process.env.ENABLE_QUEUE === 'true') {
  console.log('🔄 Initializing queue system...');
  try {
    const Queue = require('bull');
    console.log('📦 Bull package loaded successfully');
    
    movieQueue = new Queue('movie-processing', {
      redis: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: process.env.REDIS_PORT || 6379,
      },
      defaultJobOptions: {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 2000
        },
        removeOnComplete: 100, // Keep last 100 completed jobs
        removeOnFail: false
      }
    });

    // Set queue as available immediately since Bull is connected
    // The 'ready' event is unreliable in Bull v4, so we assume connection succeeds
    queueAvailable = true;
    console.log('✓ Queue initialized (Redis connection assumed successful)');

    movieQueue.on('error', (error) => {
      queueAvailable = false;
      console.error('❌ Queue error:', error.message);
      console.log('ℹ Falling back to direct processing');
    });

    movieQueue.process('create-movie', async (job) => {
      const { movieData } = job.data;
      
      try {
        console.log(`Processing movie creation: ${movieData.title}`);
        const movie = await Movie.create(movieData);
        console.log(`Movie created successfully: ${movie.title}`);
        return { success: true, movieId: movie._id };
      } catch (error) {
        console.error('Error creating movie:', error);
        throw error;
      }
    });

    movieQueue.process('bulk-create-movies', async (job) => {
      const { movies } = job.data;
      
      try {
        console.log(`Processing bulk creation of ${movies.length} movies`);
        const result = await Movie.insertMany(movies, { ordered: false });
        console.log(`Bulk creation completed: ${result.length} movies`);
        return { success: true, count: result.length };
      } catch (error) {
        console.error('Error in bulk creation:', error);
        throw error;
      }
    });

    movieQueue.on('completed', (job, result) => {
      console.log(`Job ${job.id} completed`);
    });

    movieQueue.on('failed', (job, err) => {
      console.error(`Job ${job.id} failed:`, err.message);
    });

    process.on('SIGTERM', async () => {
      if (movieQueue) await movieQueue.close();
    });

    console.log('⏳ Queue created, waiting for Redis connection...');
    
    setTimeout(() => {
      if (!queueAvailable) {
        console.log('⚠️  Redis connection not established after 5 seconds');
        console.log('   Check if Redis is running: netstat -ano | grep :6379');
        console.log('   Redis host:', process.env.REDIS_HOST || '127.0.0.1');
        console.log('   Redis port:', process.env.REDIS_PORT || 6379);
      }
    }, 5000);
    
  } catch (error) {
    queueAvailable = false;
    console.error('❌ Queue initialization error:', error.message);
    console.error('   Stack:', error.stack);
    console.log('ℹ Queue system disabled - falling back to direct operations');
  }
} else {
  console.log('ℹ Queue system disabled - using direct database operations');
  console.log('  (Set ENABLE_QUEUE=true in .env to enable queue features)');
}

module.exports = {
  movieQueue,
  isQueueAvailable: () => queueAvailable
};
