const { Strategy } = require("passport-github2");

const GithubPassport = new Strategy(
  {
    clientID: "07eb173d8eff456582db",
    clientSecret: "91fcbe3dce293cdf08f1c5046ab5d9d69f0a16f8",
    callbackURL: `http://localhost:3000/auth/github/callback`,
    passReqToCallback: true,
    scope: ["profile", "user:email"],
  },
  async (request, accessToken, refreshToken, profile, cb) => {
    const dataSave = {
      email: profile.emails[0].value,
      name: profile?.displayName,
      thumbnail: profile?._json?.avatar_url,
    };

    return cb(null, dataSave);
  }
);

module.exports = GithubPassport;
