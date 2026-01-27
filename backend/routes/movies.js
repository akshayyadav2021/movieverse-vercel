const express = require('express');
const router = express.Router();
const {
  getMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie
} = require('../controllers/movieController');
const { protect, authorize } = require('../middleware/auth');
const { movieQueue, isQueueAvailable } = require('../queues/movieQueue');


router.get('/', getMovies);
router.get('/:id', getMovie);


/*
 Queue.stats endpoint (admin only);
 router.get('/admin/queue-stats', protect, authorize('admin'), async (req, res) => {
   try {
     if (!isQueueAvailable() || !movieQueue) {
       return res.json({
         available: false,
         message: 'Queue system is not enabled'
       });
     }

     const [waiting, active, completed, failed, delayed] = await Promise.all([
       movieQueue.getWaiting(),
       movieQueue.getActive(),
       movieQueue.getCompleted(),
       movieQueue.getFailed(),
       movieQueue.getDelayed()
     ]);

    res.json({
        available: true,
        stats: {
        waiting: waiting.length,
        active: active.length,
        completed: completed.length,
        failed: failed.length,
        delayed: delayed.length
       },
       jobs: {
         waiting: waiting.map(j => ({ id: j.id, name: j.name, data: j.data })),
         active: active.map(j => ({ id: j.id, name: j.name, data: j.data })),
         failed: failed.map(j => ({ id: j.id, name: j.name, error: j.failedReason }))
       }
     });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching queue stats', error: error.message });
   }
 });
 */

router.post('/', protect, authorize('admin'), createMovie);
router.put('/:id', protect, authorize('admin'), updateMovie);
router.delete('/:id', protect, authorize('admin'), deleteMovie);

module.exports = router;
