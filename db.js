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

const Songs = db.define('song', {
	lyric: {
		type: STRING
	}
})

Songs.belongsTo(Countries)

//sync and seed
const syncAndSeed = async() => {
	await db.sync({ force: true })

	Promise.all([
		Countries.create({name: 'U.S.A', population: '331,002,651'}),
		Countries.create({name: 'France', population: '65,273,511'}),
		Countries.create({name: 'Canada', population: '37,742,154'}),
		Countries.create({name: 'Japan', population: '126,476,461'}),
		Countries.create({name: 'Montserrat', population: '4,992', note: 'British Overseas Territory'}),
		Countries.create({name: 'Holy See', population: '801', note: 'A city-state surrounded by Rome'}),

		Songs.create({lyric: 'O say can you see, by the dawn\'s early light, What so proudly we hail\’d at the twilight\’s last gleaming'}),
		Songs.create({lyric: 'Allons enfants de la Patrie, Le jour de gloire est arrivé!'}),
		Songs.create({lyric: 'O Canada! Our home and native land!True patriot love in all of us commandO Canada! Our home and native land!True patriot love in all of us command'})
	])


}

//export modules
module.exports = {
	syncAndSeed,
	Countries
}

