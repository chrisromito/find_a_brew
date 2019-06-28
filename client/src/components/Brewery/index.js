import './index.scss'
import * as R from 'ramda'
import React, { Component } from 'react'
import { Cell, Grid, Row } from '@material/react-layout-grid'
import { BreweryList } from './List'
import { BreweryItem } from './Item'



export class BreweryComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedBrewery: null,
            isOpen: false
        }
    }
    
    render() {
        const onSelect = (breweryId)=> this.onSelect(breweryId)
        return (
            <div>
                <Grid align="left">
                    <Row>
                        <Cell columns={1}></Cell>
                        <Cell className='brew mdc-elevation--z3' columns={10}>
                            <BreweryList onSelect={onSelect}
                                    breweries={this.props.breweries}></BreweryList>
                        </Cell>
                        <Cell columns={1}></Cell>
                    </Row>
                </Grid>
                <BreweryItem selectedBrewery={this.state.selectedBrewery}
                        isOpen={this.state.isOpen}
                        onClose={()=> onSelect(null)}></BreweryItem>
            </div>
        )
    }

    onSelect(selectedBrewery) {
        if (!selectedBrewery) {
            this.setState({
                selectedBrewery: null,
                isOpen: false
            })
            return false
        }
        console.log('BreweryComponent.onSelect')
        console.log(selectedBrewery)
        this.setState({
            selectedBrewery,
            isOpen: true
        })
        return selectedBrewery
    }
}


export default BreweryComponent
