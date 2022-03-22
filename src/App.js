import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setCountries } from './store'
import Countries from './Countries'
import Country from './Country'
import Nav from './Nav'
import CreateNewCountry from './CreateNewCountry'
import UpdateCountry from './UpdateCountry'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'


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
                    <Route path='/' component={Nav}/>
                    <hr/>
                    <Switch>
                        <Route exact path='/countries/create' component={CreateNewCountry}/>
                        <Route path='/countries' component={Countries}/>
                        <Route path='/countries/:id' component={Country}/>
                        <Route exact path='/countries/:id/edit' component={UpdateCountry}/>
                    </Switch>
                   
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