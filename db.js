const {Sequelize, STRING} = require('sequelize')
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/dealers_choice_full_stack')


// models

const Countries = db.define('country', {
	name: {
		type: STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	population: {
		type: STRING
	},
	note: {
		type: STRING
	}
})

const President = db.define('president', {
	name: {
		type: STRING
	}
})

Countries.belongsTo(President)

//sync and seed
const syncAndSeed = async() => {
	await db.sync({ force: true })

	const [USA, France, Canada, Japan, Montserrat, HolySee, moe, lucy, larry, jess, john, max ] = await Promise.all([
		Countries.create({name: 'USA', population: '331,002,651'}),
		Countries.create({name: 'France', population: '65,273,511'}),
		Countries.create({name: 'Canada', population: '37,742,154'}),
		Countries.create({name: 'Japan', population: '126,476,461'}),
		Countries.create({name: 'Montserrat', population: '4,992', note: 'British Overseas Territory'}),
		Countries.create({name: 'Holy See', population: '801', note: 'A city-state surrounded by Rome'}),

		President.create({name: 'moe'}),
		President.create({name: 'lucy'}),
		President.create({name: 'larry'}),
		President.create({name: 'jess'}),
		President.create({name: 'john'}),
		President.create({name: 'max'}),
	])

	USA.presidentId = moe.id
	France.presidentId = lucy.id
	Canada.presidentId = larry.id
	Japan.presidentId = jess.id
	Montserrat.presidentId = john.id
	HolySee.presidentId = max.id

	await Promise.all([
		USA.save(), France.save(), Canada.save(), Japan.save(), Montserrat.save(), HolySee.save()
	])
}

//export modules
module.exports = {
	syncAndSeed,
	Countries,
	President
}

