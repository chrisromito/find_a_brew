
import React, { Component } from 'react';
import { Cell, Grid, Row } from '@material/react-layout-grid';
import { CityInput } from './City'
import { SearchInput } from './Input'


const BREWERY_API = 'https://api.openbrewerydb.org/breweries'


/**
 * @class SearchComponent - Container component for the
 * city search input & city picker dropdown.
 * 
 * We manage HTTP-level state for the Brewery API search
 * results here, & push brewery search results up the chain.
 * This acts as a logic-gate sort of deal, where internal state is contained
 * and validated before telling other components about the state-change.
 * 
 */
export class SearchComponent extends Component {
    constructor(...props) {
        super(...props)
        this.state = {
            loading: false,
            selectedCity: {},
            query: ''
        }
    }
    
    render() {
        return (
            <div>
                <Grid align="left">
                    <Row>
                        <Cell columns={3}>
                            <SearchInput onSearch={(query)=> this.onSearch(query)}>
                            </SearchInput>
                        </Cell>
                        <Cell columns={3}>
                            <CityInput onCitySelect={(selectedCity)=> this.onCitySelect(selectedCity)}></CityInput>
                        </Cell>
                    </Row>
                </Grid>
            </div>
        )
    }

    /**
     * @method onCitySelect - Receive a City when a user
     * selects one of the options in the City picker menu
     * @param {City} selectedCity
     * @returns {City}
     */
    onCitySelect(selectedCity) {
        this.setState({ selectedCity })
        this.props.propagateCitySelection({ selectedCity })
        this.onSearch(this.state.query)
        return selectedCity
    }

    /**
     * 
     */
    onSearch(query) {
        if (query.length < 3) {
            return query
        }

        this.setState({ query })
        return fetch(`${BREWERY_API}/search?query=${query}`)
            .then((breweries)=> breweries.json())
            .then((breweries)=>
                this.state.query === query
                ? this.props.onBreweryLoad(breweries)
                : breweries
            )
    }

}


export default SearchComponent
