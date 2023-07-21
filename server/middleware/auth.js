var User = require('../model/user.model');
var passport = require('passport');
var passportJWT = require('passport-jwt');
var config = require('../config');
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;

var params = {
  secretOrKey: config.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

module.exports = function () {
  var strategy = new Strategy(params, function (payload, done) {
    User.findById(payload.id, function (err, user) {
      if (err) {
        return done(new Error('User not found'), null);
      } else if (payload.expire <= Date.now()) {
        return done(new Error('Token expired'), null);
      } else {
        return done(null, user);
      }
    });
  });

  passport.use(strategy);

  return {
    initialize: function () {
      return passport.initialize();
    },
    authenticateToken: function () {
      return passport.authenticate('jwt', { session: false });
    },
  };
};
