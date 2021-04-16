const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const UserRepository = require("../Repository/UserRepository");
var config = require("../libs/config");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.get("secretKey"),
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, async (payload, done) => {
      try {
        const user = await UserRepository.GetByIdAndIdRole(
          payload.id,
          payload.id_role
        );
        if (user.length > 0) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (e) {
        done(e.message, false);
      }
    })
  );
};
