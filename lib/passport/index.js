const passport = require('passport');

const { User } =require('../../models');

const JwtStrategy = require('./jwtStategy');

const deserialize = async (id, done) => {
  try {
    const user = await User.findByPk(id);

    if (!user) {
      return done(new Error('User not found'), false,);
    }

    return done(null, user)

  } catch(err) {
    return done(err, false,)
  }
};

const serialize = (user, done) => {
  done(null, user.id);
}


passport.use(JwtStrategy(User));
passport.deserializeUser(deserialize);
passport.serializeUser(serialize);

module.exports = passport;
