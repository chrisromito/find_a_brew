import './app.scss';
import React, { Component } from 'react';
import '@material/react-layout-grid/index.scss';

import { BreweryComponent } from './components/Brewery'
import { SearchComponent } from './components/Search'

export class App extends Component {

    constructor(...props) {
        super(...props)
        this.state = {
            loading: false,
            breweries: [],
            selectedCity: {}
        }
    }

    render() {
        // const propagateCitySelection = (selectedCity)=> this.setState({ selectedCity })
        return (
            <div>
                <div className="width--100 flex flex--align-start background--background text--text padding--top-20 mdc-elevation--z2">
                    <SearchComponent props={{...this.state}}
                        propagateCitySelection={(selectedCity)=> this.setState({ selectedCity })}
                        onLoadChange={(loading)=> this.onLoadChange(loading)}
                        onBreweryLoad={(breweries)=> this.onBreweryLoad(breweries)}>
                    </SearchComponent>
                </div>
                <div className="width--100 mdc-theme--surface">
                    <BreweryComponent breweries={this.state.breweries}
                        loading={this.state.loading}
                        selectedCity={this.state.selectedCity}></BreweryComponent>
                </div>
            </div>
        )
    }

    onBreweryLoad(breweries) {
        this.setState({ breweries })
        return breweries
    }

    onLoadChange(loading) {
        this.setState({ loading })
        return loading
    }
}

export default App;