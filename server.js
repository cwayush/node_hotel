const express = require('express')
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.send('Welcome to my Hotel... How i can help you ?')
});


const personroutes = require('./routes/personrouts')
app.use('/person', personroutes)

const menuitems = require('./routes/menuitem')
app.use('/MenuItem', menuitems)

app.listen(3000, () => {
    console.log('Listening on port 3000')
});
