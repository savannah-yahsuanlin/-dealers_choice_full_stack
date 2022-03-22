import React from 'react'
import { connect } from 'react-redux'
import { ruinCountry } from './store'
import { Link, Route } from 'react-router-dom'
import Country from './Country'

const Countries = ({ countries, deleteCountry}) => {

    return (
         <div>
            <ul className='countryList'>
            {
                countries.map(country => {
                    return (		
                        <div key={country.id}>
                            <li>
                             <Link to={`/countries/${country.id}`}>{country.name}</Link>
                            </li>
                            <button onClick={ () => deleteCountry(country) }>X</button>
                        </div>
                    )
                })
            }
            </ul>
            <Route path='/countries/:id' component={Country}/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return state
}
 
const mapDispatchToProps = (dispatch) => {
    return {
        deleteCountry: (country) => {dispatch(ruinCountry(country))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Countries)