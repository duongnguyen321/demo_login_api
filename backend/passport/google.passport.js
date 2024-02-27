const { Strategy } = require("passport-google-oauth2");

const GooglePassport = new Strategy(
  {
    clientID:
      "145248609159-uaett841h8l7am7gl14a2j7fcug0sk40.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: `http://localhost:3000/auth/google/callback`,
    passReqToCallback: true,
    scope: ["profile"],
  },
  async (request, accessToken, refreshToken, profile, cb) => {
    const dataSave = {
      email: profile?.email,
      name: profile?.displayName,
      thumbnail: profile?._json?.picture,
    };

    return cb(null, dataSave);
  }
);

module.exports = GooglePassport;
