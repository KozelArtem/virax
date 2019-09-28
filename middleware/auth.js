const passport = require('passport');

module.exports = {
  requireAuth: (req, res, next) => {
    return passport.authenticate('jwt', { session: false });
  },
};
