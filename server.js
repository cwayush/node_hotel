const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();

const passport = require('./auth')
const bodyParser = require('body-parser');
app.use(bodyParser.json())
const PORT = process.env.PORT || 3000;

// Middleware function:
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to: ${req.originalUrl}`)
    next();
}
app.use(logRequest)

app.use(passport.initialize())

const localauthmiddleware = passport.authenticate('local', { session: false })
app.get('/', function (req, res) {
    res.send('Welcome to my Hotel... How i can help you ?')
});


const personroutes = require('./routes/personrouts')
const menuitems = require('./routes/menuitem')

app.use('/person', personroutes)
app.use('/MenuItem', menuitems)

app.listen(PORT, () => {
    console.log('Listening on port 3000')
});
