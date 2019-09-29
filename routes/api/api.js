const router = require('express').Router();

const passport = require('passport');

const authRoute = require('./auth');
const studentRoute = require('./student');
const profileRoute = require('./profile');
const vacancyRoute = require('./vacancy');

router.use(authRoute);
router.use(passport.authenticate('jwt', { session: false }), profileRoute);
router.use(
  '/student',
  passport.authenticate('jwt', { session: false }),
  studentRoute,
);
router.use(
  '/vacancy',
  passport.authenticate('jwt', { session: false }),
  vacancyRoute,
);

module.exports = router;
