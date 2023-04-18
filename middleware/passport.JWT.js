const passport= require('passport');
const passportJWT = require('passport-jwt');
const User = require('../model/user.model');
const dotenv = require('dotenv').config();

const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

// when import it we will import it as a function
module.exports = () => {
    const strategy = new Strategy(params, async (payload, done) => {
        const user = await User.findById(payload.id);
        if(!user) return done(new Error('User not Found'), null)

        return done(null, user)
    });
    passport.use(strategy);

    return {
        initialize: function (){
            return passport.initialize()
        },
        authenticate: function (){
            return passport.authenticate('jwt', {session: false})
        }
    }
}