const passport = require('passport');

const router = require('express').Router();

const ctrl = require('../../controllers/student');

router.get('/:studentId', passport.authenticate('jwt', { session: false }), ctrl.get);

// router.get('/:studentId/vacancy');

// router.post('/:studentId/offer');

// router.get('/:studentId/offers');

module.exports = router;
