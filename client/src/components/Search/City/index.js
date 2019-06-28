import '@material/react-text-field/index.scss'
import './index.scss'
import * as R from 'ramda'
import React, { Component } from 'react'
import TextField, { HelperText, Input } from '@material/react-text-field'
import { debounce } from '../../utils'
import { CityPicker, cityDisplayValue } from './CityPicker'



/**
 * @typedef {Object} City
 * @property {Number} id
 * @property {String} city - City name
 * @property {String} city_ascii
 * @property {Number} lat - Latitude
 * @property {Number} lng - Longitude
 * @property {State} state
 * @property {String[]} zips - List of zip codes
 */

/**
 * @typedef {Object} State
 * @property {Number} id
 * @property {String} name
 * @property {String} abbreviation
 */


export class CityInput extends Component {
    constructor(...props) {
        super(...props)
        this.state = {
            loading: false,
            cities: [],
            query: '',
            selectedCity: null,
            focused: false
        }

        this.debounceFetchCities = debounce((q) => this.onCitySearch(q), 200)
    }

    render() {
        const onCitySearch = R.pipe(
            R.tap((query) => this.setState({ query })),
            R.tap(this.debounceFetchCities)
        )

        return (
            <div>
                <div className="city--input-width">
                    <TextField
                        label='Location'
                        helperText={<HelperText>Enter a City, State, and/or Zip Code</HelperText>}>
                        <Input
                            value={this.state.query}
                            onChange={(e) => onCitySearch(e.target.value)}
                            onFocus={() => this.onFocusChange({ focused: true })}
                            onBlur={debounce(() => this.onFocusChange({ focused: false }), 200)}>
                        </Input>
                    </TextField>
                </div>
                <div>
                    <CityPicker cities={this.state.cities}
                        onCitySelect={(selectedCity) => this.onCitySelect(selectedCity)}
                        open={this.state.focused}></CityPicker>
                </div>
            </div>
        )
    }

    onFocusChange({ focused }) {
        this.setState({ focused })
        return focused
    }

    onCitySearch(query) {
        /**
         * @method onCitySearch - Ensures search query is > 3 characters.
         * Fetches cities & updates state
         * TODO: Is there a better way to prevent race conditions
         * vs. the 'this.state.query === query' we're doing below?
         * @param {String} query - City Search query (entered by user)
         * @returns {Promise<City[]>}
         */
        if (query.length < 2) {
            return query
        }

        this.setState({ loading: true })

        return fetch(`/api/cities/?q=${query}`)
            .then((cities) => cities.json())
            .then((cities) => {
                if (this.state.query === query) {
                    this.setState({ cities })
                }
                return cities
            }).catch((err) => {
                alert(`
                    Encountered an error while attempting to fetch cities.
                    Error: ${err}
                `)
                return Promise.reject(err)
            })
    }

    onCitySelect(cityId) {
        const selectedCity = R.find(
            R.propEq('id', Number(cityId)),
            this.state.cities
        ) || null

        this.setState({
            selectedCity,
            query: selectedCity ? cityDisplayValue(selectedCity) : ''
        })
        this.props.onCitySelect(selectedCity)
        // Make the input display the appropriate value
        return selectedCity
    }
}


export default CityInput
