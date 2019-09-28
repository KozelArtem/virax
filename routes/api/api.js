const router = require('express').Router();

const authRoute = require('./auth');
const studentRoute = require('./student');
const profileRoute = require('./profile');

router.use(authRoute);
router.use(profileRoute);
router.use('/student', studentRoute);

module.exports = router;
