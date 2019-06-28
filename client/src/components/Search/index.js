
import React, { Component } from 'react';
import { Cell, Grid, Row } from '@material/react-layout-grid';
import { CityInput } from './City'
import { SearchInput } from './Input'


const BREWERY_API = 'https://api.openbrewerydb.org/breweries'


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

    onCitySelect(selectedCity) {
        this.setState({ selectedCity })
        this.props.propagateCitySelection({ selectedCity })
        this.onSearch(this.state.query)
        return selectedCity
    }

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
