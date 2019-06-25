
import React, { Component } from 'react';
import { Cell, Grid, Row } from '@material/react-layout-grid';
import { CityInput } from './City'
import { SearchInput } from './Input'


export class SearchComponent extends Component {
    constructor(...props) {
        super(...props)
        this.state = {
            loading: false,
            search: this.props.search,
            selectedCity: {}
        }
    }
    
    render() {
        const onCitySelect = (e)=> this.onCitySelect(e.target.value)
        const onSearch = (query)=> this.onSearch(query)
        return (
            <div>
                <Grid align="left">
                    <Row>
                        <Cell columns={3}>
                            <SearchInput onSearch={onSearch}>
                            </SearchInput>
                        </Cell>
                        <Cell columns={3}>
                            <CityInput onCitySelect={onCitySelect}></CityInput>
                        </Cell>
                    </Row>
                </Grid>
            </div>
        )
    }

    onCitySelect(selectedCity) {
        console.log('onCitySelect()')
        console.log(selectedCity)
        this.setState({ selectedCity })
        return selectedCity
    }

    onSearch(query) {
        console.log('onSearch()')
        console.log(query)
        return query
    }

    handleLoadChange(loading) {
        return this.props.onLoadChange(loading)
    }

    handleBreweries(breweries) {
        return this.props.onBreweriesLoad(breweries)
    }
}

export default SearchComponent
