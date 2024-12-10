const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json())
const PORT = process.env.PORT || 3000;


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
