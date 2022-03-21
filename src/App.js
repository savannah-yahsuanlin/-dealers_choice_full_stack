import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setCountries} from './store'
import Countries from './Countries'
import Country from './Country'
import CreateNewCountry from './CreateNewCountry'
import {HashRouter as Router, Route} from 'react-router-dom'


class App extends Component {
	componentDidMount(){
		this.props.loadCountries()	
	}
	render() {
		const { countries } = this.props
		return (
			<Router>
				<div>
					<h1>Full Stack Country Wiki</h1>
					<p>Help us add more data</p>
					<CreateNewCountry/>
					<Countries countries = { countries }/>
					<Route path='/countries/:id' component={Country} />
				</div>
			</Router>
		)
	}
}


const mapStateToProps = (state) => {
	return state
}

const mapDispatchToProps = (dispatch) => {
	return {
		loadCountries: () => dispatch(setCountries())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)