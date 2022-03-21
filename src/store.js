import {createStore, combineReducers, applyMiddleware} from 'redux'
import loggingMiddleware from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios'


//action
const SET_COUNTRIES = 'SET_COUNTRIES'
const CREATE_COUNTRY = 'CREATE_COUNTRY'
const UPDATE_COUNTRY = 'UPDATE_COUNTRY'
const RUIN_COUNTRY = 'RUIN_COUNTRY'

//action creator
const _setCountries = () => {
	return {
		type: SET_COUNTRIES,
		countries
	}
}

const _updateCountry = (country) => {
	return {
		type: UPDATE_COUNTRY,
		country
	}
}

//thunk creator
const setCountries = () => {
	return async (dispatch) => {
		const countries = (await axios.get('/api/countries')).data
		dispatch(_setCountries(countries))
	}
}

const createCountries = (country) => {
	return async(dispatch) => {
		const created = (await axios.post('/api/countries', country)).data
		dispatch({type: CREATE_COUNTRY, country}, created)
	}
}

const ruinCountry = (country) => {
	return async(dispatch) => {
		await axios.delete(`/api/countries/${country.id}`)
		dispatch({type: RUIN_COUNTRY, country})
	}
}

const updateCountry = (country) => {
	return async(dispatch) => {
		const updated = (await axios.put(`/api/countries/${country.id}`, country)).data
		console.log(updated)
		dispatch(_updateCountry(updated))
	}
}

//reducer
const countriesReducer = ( state = [], action ) => {

	if(action.type === SET_COUNTRIES) {
		state = action.countries
	}

	if(action.type === CREATE_COUNTRY) {
		state = [...state, action.country]
	}

	if(action.type === RUIN_COUNTRY) {
		state = state.filter(country => country.id !== action.country.id)
	}

	if(action.type === UPDATE_COUNTRY) {
		state = state.map(country => country.id === action.country.id ? action.country: country)
	}

	return state
}

//combine
const reducer = combineReducers({
	countries: countriesReducer
})



const store = createStore(reducer, applyMiddleware(thunk, loggingMiddleware))

export {setCountries, createCountries, ruinCountry, updateCountry} 

export default store