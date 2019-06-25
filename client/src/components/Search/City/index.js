// import * as R from 'ramda'
import { pipe, prop, sortBy, tap } from 'ramda'
import React, { Component } from 'react'
import '@material/react-text-field/index.scss'
import TextField, {HelperText, Input} from '@material/react-text-field'
import { debounce } from '../../utils'
import { AutoComplete } from './AutoComplete'


export class CityInput extends Component {
    constructor(...props) {
        super(...props)
        this.state = {
            loading: false,
            cities: [],
            query: '',
            selectedCity: null
        }
    }

    render() {
        const fetchCities = debounce((e)=> this.onCitySearch(e), 20)
        const onCitySearch = pipe(
            tap((query)=> this.setState({ query })),
            tap(fetchCities)
        )

        const handleCitySelect = (selectedCity)=> this.handleCitySelect(selectedCity)
        const value = this.state.query ? this.state.query : ''
        return (
            <div>
                <TextField
                    label='Location'
                    helperText={<HelperText>Enter a City, State, and/or Zip Code</HelperText>}>
                    <Input
                        value={value}
                        onChange={(e)=> onCitySearch(e.target.value)}>
                    </Input>
                </TextField>
                <AutoComplete cities={this.state.cities}
                        onCitySelect={handleCitySelect}></AutoComplete>
            </div>
        )
    }

    onCitySearch(query) {
        console.log('CityInput.onCitySearch()')
        console.log(query)
        window._searchQuery = query
        console.log(query)
        if (query.length < 2) {
            return query
        }
        // Set the state
        this.setState({
            query,
            loading: true
        })
        // Fetch the cities
        return fetch(`/api/cities/?q=${query}`)
            .then((cities)=>
                cities.json())
            .then(
                sortBy(prop('city_ascii')))
            .then((cities)=>
                this.setState({ cities }))
            .catch((err)=> {
                console.error(err)
                alert(`
                    Encountered an error while attempting to fetch cities.
                    Error: ${err}
                `)
                return Promise.reject(err)
            })
    }
    

    handleCitySelect(selectedCity) {
        this.setState({ selectedCity })
        this.props.onCitySelect(selectedCity)
        return selectedCity
    }
}


export default CityInput
