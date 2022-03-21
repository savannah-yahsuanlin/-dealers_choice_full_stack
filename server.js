const express = require('express');
const app = express();
const path = require('path');
const {syncAndSeed, Countries } = require('./db')

app.use(express.json())
app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));


//Countries

app.get('/api/countries', async(req, res, next) => {
	try {
		res.send(await Countries.findAll())
	} catch (error) {
		next(error)
	}
})

app.delete('/api/countries/:id', async(req, res, next) => {
	try {
		const country = await Countries.findByPk(req.params.id)
		await country.destroy()
		res.sendStatus(204)
	} catch (error) {
		next(error)
	}
})

app.post('/api/countries', async(req, res, next) => {
	try {
		res.status(201).send(await Countries.create(req.body))
	} catch (error) {
		next(error)
	}
})

app.put('/api/countries/:id', async(req, res, next) => {
	try {
		const country = await Countries.findByPk(req.params.id)
		await country.update(req.body)
		res.status(202).send(country)
	} catch (error) {
		next(error)
	}
})

//get single country

app.get('/api/countries/:id', async(req, res, next) => {
	try {
		res.send(await Countries.findByPk(req.params.id))
	}
	catch(error) {
		next(error)
	}
})



app.use((err, req, res, next) => {
	res.status(500).send({error: err})
})


//set up
const setUp = async() => {
	try {
		await syncAndSeed()
		const port = process.env.PORT || 3000;
		app.listen(port, ()=> console.log(`listening on port ${port}`));
	} catch (error) {
		console.log(error)
	}
}

setUp()