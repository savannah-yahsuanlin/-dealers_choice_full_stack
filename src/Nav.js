import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
	return (
		<nav>
			<Link to='/countries/create'>Create a country</Link>
			<Link to='/countries'>Countries List</Link>
			<Link to='/countries/edit'>Edit Country</Link>
		</nav>
	)
}


export default Nav