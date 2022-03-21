import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createCountries } from './store'

class CreateNewCountry extends Component {
	constructor() {
		super()
		this.state = {
			name: '',
			population: ''
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	handleSubmit(e) {
		e.preventDefault()
		this.props.addCountry({...this.state})
	}

	handleChange(e) {
		const change = {}
		change[e.target.name] = e.target.value
		this.setState(change)
	}


	render() {
		const { name, population } = this.state
		const {  handleSubmit, handleChange } = this
		return (
			<div>
				<form onSubmit={ handleSubmit }>
					<input name='name' value={name} placeholder='country name' onChange = { handleChange } />
					<input name='population' value={population} placeholder='population' onChange={ handleChange }/>
					{!name ||!population ? <button className='save' disabled> Save </button> : <button className='save'> Save </button>}
				</form>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addCountry: (country) => dispatch(createCountries(country))
	}
}

export default connect(null, mapDispatchToProps)(CreateNewCountry)