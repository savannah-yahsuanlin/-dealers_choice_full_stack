import React from 'react'
import { connect } from 'react-redux'
import { ruinCountry } from './store'
import { Link } from 'react-router-dom'

const Countries = ({ countries, deleteCountry }) => {
    return (
         <div>
            <ul className='countryList'>
            {
                countries.map(country => {
                    return (		
                        <div>
                            <Link to={`/countries/${country.id}`}><li key={country.id}>{country.name}</li></Link>
                            <button onClick={ () => deleteCountry(country) }>X</button>
                        </div>
                    )
                })
            }
            </ul>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteCountry: (country) => {dispatch(ruinCountry(country))}
    }
}

export default connect(null, mapDispatchToProps)(Countries)