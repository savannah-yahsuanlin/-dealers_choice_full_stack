import React, { Component } from 'react'
import { setSingleCountry, updateCountry} from './store'
import { connect } from 'react-redux'

class UpdateCountry extends Component {
	constructor(props) {
		super(props)
console.log(this.props.country)
		this.state = {
			name: this.props.country.id ? this.props.country.name : '',
			population: this.props.country.id ? this.props.country.population : '',
			note: this.props.country.id ? this.props.country.note : ''
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	
	componentDidMount() {
		try {
			this.props.loadSingleCountry(this.props.match.params.id)
		} catch (error) {
			console.log(error)
		}
	}

	handleSubmit(e) {
		e.preventDefault()
		this.props.updateCountry({...this.props.country, ...this.state})
	}

	handleChange(e) {
		const change = {}
		change[e.target.name] = e.target.value
		this.setState(change)
	}

	render() {
		const { name, population, note } = this.state
		const {  handleSubmit, handleChange } = this
		return (
			<div>
				<form onSubmit={ handleSubmit }>
					<input name='name' value={name} placeholder='country name' onChange = { handleChange } />
					<input name='population' value={population} placeholder='population' onChange={ handleChange }/>
					<input name= 'note' value={note} placeholder='note' onChange={handleChange}/>
					{!name ||!population ? <button className='save' disabled> Update </button> : <button className='save'> Update </button>}
				</form>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		country: state.country
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		loadSingleCountry: async(id) => await dispatch(setSingleCountry(id)),
		updateSingleCountry: (country)=> dispatch(updateCountry(country))
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(UpdateCountry)