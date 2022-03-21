import React from "react";
import { connect } from 'react-redux'

const Country = (props) => {
    const country = props.countries.find(country => country.id === props.match.params.id*1)
    return (
        <div>
            <hr/>
            <h1 key={country.id}>{country.name}</h1>
            { country.note ? <small>Note: '{country.note}'</small> : ''}
            <p>Population: {country.population}</p>
        </div>
    )
}


export default connect(state=>state)(Country)