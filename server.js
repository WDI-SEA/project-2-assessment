const express = require('express');
const methodOverride = require('method-override');
var db = require('./models')

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.static('static'));
app.use(methodOverride('_method'));

// WRITE YOUR ROUTES HERE /////////////////////
app.get('/', (req, res) => {
	db.widget.findAll()
	.then(function(widgets) {
		res.render('home', { widgets: widgets })
	})
	.catch(error => {
		if(error){
			console.log(error);
			res.send("There was an error processing your request")
		}
	});
});

app.post('/', (req, res) => {
	db.widget.create({
		description: req.body.description,
		quantity: req.body.quantity
	})
	.then(function(widget){
		res.redirect('home')
	})
	.catch(error => {
		if(error){
			console.log(error);
			res.send("There was an error processing your request")
		}
	});
})

app.delete('/:id', (req, res) => {
	db.widget.destroy({
		where : { id: req.params.id }
	})
	.then(() => {
		res.redirect('home')
	})
	.catch(error => {
		if(error){
			console.log(error)
			res.send("There was an error processing your request")
		}
	});
})

// YOUR ROUTES ABOVE THIS COMMENT /////////////

app.listen(3000);
