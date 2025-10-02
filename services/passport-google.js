require('dotenv').config();
var axios = require("axios");

const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = function (passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK,
    }, async (accessToken, refreshToken, profile, done) => {
        // match user
        await axios
            .post("http://apiend:5001/v1/auth/google-register", profile._json)
            .then(({ data }) => {
                return done(null, data);
            })
            .catch((error) => {
                return done(null, false, {message: error.message});
            });
    }));

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

}