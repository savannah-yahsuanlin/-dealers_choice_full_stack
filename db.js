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


//sync and seed
const syncAndSeed = async() => {
	await db.sync({ force: true })

	Promise.all([
		Countries.create({name: 'U.S.A', population: '331,002,651'}),
		Countries.create({name: 'France', population: '65,273,511'}),
		Countries.create({name: 'Canada', population: '65,273,511'}),
		Countries.create({name: 'Japan', population: '126,476,461'}),
		Countries.create({name: 'Montserrat', population: '4,992', note: 'British Overseas Territory'}),
		Countries.create({name: 'Holy See', population: '801', note: 'A city-state surrounded by Rome'})
	])
}

//export modules
module.exports = {
	syncAndSeed,
	Countries
}

