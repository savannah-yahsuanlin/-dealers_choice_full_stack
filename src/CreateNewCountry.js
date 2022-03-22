import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createCountries } from './store'

class CreateNewCountry extends Component {
	constructor() {
		super()
		this.state = {
			name: '',
			population: '',
			note: '',
			president: ''
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
		const { name, population, note, president } = this.state
		const {  handleSubmit, handleChange } = this
		return (
			<div>
				<form onSubmit={ handleSubmit }>
					<input name='name' value={name} placeholder='country name' onChange = { handleChange } />
					<input name='population' value={population} placeholder='population' onChange={ handleChange }/>
					<input name='note' value={note} placeholder='note' onChange={ handleChange }/>
					<input name='president' value={president} placeholder='president' onChange={ handleChange }/>
					{!name ||!population ? <button className='save' disabled> Save </button> : <button className='save'> Save </button>}
				</form>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch, {history}) => {
	return {
		addCountry: (country) => dispatch(createCountries(country, history))
	}
}

export default connect(null, mapDispatchToProps)(CreateNewCountry)