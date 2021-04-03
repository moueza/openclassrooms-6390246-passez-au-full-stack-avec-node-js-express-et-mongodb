const express = require('express');
const mongoose = require('mongoose');

const app = express();

//const Thing = require('./models/thing');
const Thing = require('./models/Thing');

mongoose.connect('mongodb+srv://openclassrooms-6390246-passez-au-full-stack-avec-node-js-express-et-mongodb:NaNSw7jek1VJXJeY@cluster0.5vi6h.mongodb.net/test?retryWrites=true&w=majority',
		 { useNewUrlParser: true,
		   useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const bodyParser = require('body-parser');



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());
app.post('/api/stuff', (req, res, next) => {
	delete req.body._id;
	const thing = new Thing({
		/**spread */
	  ...req.body
	});
	/**promise */
	thing.save()
	  .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
	  .catch(error => res.status(400).json({ error }));
    
});

app.get('/api/stuff/:id', (req, res, next) => {
	Thing.findOne({ _id: req.params.id })
	  .then(thing => res.status(200).json(thing))
	  .catch(error => res.status(404).json({ error }));
  });
  
/**app.use(' */
app.get('/api/stuff', (req, res, next) => {
	Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
});
module.exports = app;




