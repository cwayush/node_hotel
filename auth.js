const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const person = require('./models/person')

passport.use(new LocalStrategy(async (USERNAME, password, done) => {
    try {
        console.log('Receive Credentials:', USERNAME, password);
        const user = await person.findOne({ username: USERNAME });
        if (!user)
            return done(null, false, { message: 'Incorrect Username.' });
        const ispasswordMatch = await user.comparePassword(password);
        if (ispasswordMatch) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Incorrect Password.' });
        }

    } catch (error) {
        return done(err)
    }
}))
module.exports = passport