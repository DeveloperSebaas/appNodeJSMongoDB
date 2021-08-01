const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  //Match Email's user
  const user = await User.findOne({ email })
  if (!user) {
    return done(null, false, { message: 'Not user found' });
  } else {
    //Match Password's user
    const pass = await User.findOne({ password })
    if (!pass) {
      return done(null, false, { message: 'Incorrect password' });
    } else {
      return done(null, user);
    }
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  })
});