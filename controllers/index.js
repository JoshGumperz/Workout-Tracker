const router = require('express').Router();

const apiRoutes = require('./api');
const exerciseRoutes = require('./exerciseRoutes');
const statRoutes = require('./statRoutes');

router.use('/exercise', exerciseRoutes);
router.use('/stats', statRoutes);
router.use('/api', apiRoutes);

module.exports = router;
