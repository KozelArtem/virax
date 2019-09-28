const passportJWT = require('passport-jwt');

const config = require('../../config/app.json');

const Strategy = passportJWT.Strategy;
const ExtractFromHeader = passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken();

module.exports = (User) => {
  return new Strategy(
    {
      jwtFromRequest: ExtractFromHeader,
      secretOrKey: config.secret,
    },
    async (payload, done) => {
      try {
        const user = await User.findByPk(payload);

        if (!user) {
          return done(new Error('User not found'), false);
        }

        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    },
  );
};
