import React from "react";
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import UpdateCountry from "./UpdateCountry";


const Country = (props) => {
    const id = props.match.params.id*1
    const selected = props.countries.find(country => country.id === id)
    if(!selected) {
        return null
    } 
    return (
        <div>
            <div key={selected.id}>
                <hr/>
                <h1 key={selected.id}>{selected.name}</h1>
                { selected.note ? <small>Note: {selected.note}</small> : '' }
                <p>Population: {selected.population}</p>
				{selected.president.name? <p>President: {selected.president.name}</p> : ''}
            </div> 
            <form>
             <button type='submit'><Link to={`/countries/${id}/edit`}>Update</Link></button>
            </form>
            <Route path='/countries/:id/edit' component={UpdateCountry} />
        </div>
    )
}

export default connect(state=>state)(Country)