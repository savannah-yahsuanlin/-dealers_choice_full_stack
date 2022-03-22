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
const _setCountries = (countries) => {
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

//thunk creator for countries
const setCountries = () => {
	return async (dispatch) => {
		const countries = (await axios.get('/api/countries')).data
		dispatch(_setCountries(countries))
	}
}

const createCountries = (country, history) => {
	return async(dispatch) => {
		const created = (await axios.post('/api/countries', country)).data
		dispatch({type: CREATE_COUNTRY, country}, created)
		history.push('/countries')
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

//action for single country
const SET_SINGLE_COUNTRY = 'SET_SINGLE_COUNTRY'

const _setSingleCountry = (country) => {
	return {
		type: SET_SINGLE_COUNTRY,
		country
	}
}

////thunk creator for country
const setSingleCountry = (id) => {
	return async(dispatch) => {
		const response = (await axios.get(`/api/countries/${id}`)).data
		dispatch(_setSingleCountry(response))
	}
}


////single country reducer
const singleCountryReducer = (state = {}, action) => {
	if(action.type === SET_SINGLE_COUNTRY) {
		state = action.country
	}
	return state 
}

//combine
const reducer = combineReducers({
	countries: countriesReducer,
	singleCountry: singleCountryReducer
})


//create store
const store = createStore(reducer, applyMiddleware(thunk, loggingMiddleware))

export {setCountries, createCountries, ruinCountry, updateCountry, setSingleCountry} 

export default store