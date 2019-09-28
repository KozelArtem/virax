const passport = require('passport');

module.exports = {
  requireAuth: (req, res, next) => {
    console.log('moddle');
    
    return passport.authenticate('jwt', { session: false, failWithError: true}, (err, user, info) => {
      console.log(err, user, info);
      
    });
    
  },
};
