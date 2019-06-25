import './app.scss';
import React, { Component } from 'react';
import { Cell, Grid, Row } from '@material/react-layout-grid';
import '@material/react-layout-grid/index.scss';

import { SearchInput } from './components/Search/Input'
import { CityInput } from './components/Search/City'
import { BreweryList } from './components/Brewery/List'
import { SearchComponent } from './components/Search'

export class App extends Component {

    constructor(...props) {
        super(...props)
        this.state = {
            loading: false,
            breweries: []
        }
    }

    render() {
        return (
            <div>
                <div className="width--100 flex flex--align-start background--background text--text padding--top-20 mdc-elevation--z2">
                    <SearchComponent props={{...this.state}}
                        onLoadChange={(loading)=> this.onLoadChange(loading)}
                        onBreweriesLoad={(breweries)=> this.onBreweriesLoad(breweries)}>
                    </SearchComponent>
                </div>
                <div className="width--100 flex flex--align-start flex--justify-start mdc-theme--surface">
                    <BreweryList breweries={this.state.breweries}></BreweryList>
                </div>
            </div>
        )
    }

    onBreweriesLoad(breweries) {
        return this.setState({ breweries })
    }

    onLoadChange(loading) {
        return this.setState({ loading })
    }
}

export default App;