const express = require('express');
const methodOverride = require('method-override');
const db = require('./models')

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.static('static'));
app.use(methodOverride('_method'));

// WRITE YOUR ROUTES HERE /////////////////////
app.get('/', (req, res) => {
    db.widget.findAll()
    .then( (widgets) => {
        res.render('index', { widgets })
    })
    .catch( err => {
        console.log(error)
        res.send('There was an error. Try something else.')
    })
})


// YOUR ROUTES ABOVE THIS COMMENT /////////////

app.listen(3000);
