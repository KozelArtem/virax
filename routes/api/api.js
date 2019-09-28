const router = require('express').Router();

const passport = require('passport');

const authRoute = require('./auth');
const studentRoute = require('./student');
const profileRoute = require('./profile');

router.use(authRoute);
router.use(passport.authenticate('jwt', { session: false }), profileRoute);
router.use('/student', studentRoute);

module.exports = router;
