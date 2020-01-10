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
        res.send('There was an error getting all widgets and rendering the home page.')
    })
})

app.post('/', (req, res) => {
    db.widget.create({
        description: req.body.description,
        quantity: req.body.quantity
    })
    .then( widget => {
        res.redirect('/')
    })
    .catch( err => {
        console.log(error)
        res.send('There was an error creating a widget and redirecting to the home page.')
    })
})

app.delete('/', (req, res) => {
    db.widget.destroy({
        where: { id: req.body.id }
    })
    .then( () => {
        res.redirect('/')
    })
    .catch( err => {
        console.log(error)
        res.send('There was an error deleting a widget and redirecting to the home page.')
    })
})

// YOUR ROUTES ABOVE THIS COMMENT /////////////

app.listen(3000);
