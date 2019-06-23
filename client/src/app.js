import './app.scss';
import React, { Component } from 'react';
import { Cell, Grid, Row } from '@material/react-layout-grid';
import '@material/react-layout-grid/index.scss';

import { SearchInput } from './components/Search/Input'
import { CityInput } from './components/Search/City'
import { BreweryList } from './components/Brewery/List'

export class App extends Component {
    render() {
        return (
            <div>
                <div className="width--100 flex flex--align-start background--background text--text padding--top-20 mdc-elevation--z2">
                    <Grid align="left">
                        <Row>
                            <Cell columns={3}>
                                <SearchInput></SearchInput>
                            </Cell>
                            <Cell columns={3}>
                                <CityInput></CityInput>
                            </Cell>
                        </Row>
                    </Grid>
                </div>
                <div className="width--100 flex flex--align-start flex--justify-start mdc-theme--surface">
                    <BreweryList></BreweryList>
                </div>
            </div>
        )
    }
}

export default App;