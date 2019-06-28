import './index.scss'
import React, { Component } from 'react'
import { Cell, Grid, Row } from '@material/react-layout-grid'
import { BreweryList } from './List'
import { BreweryItem } from './Item'


/**
 * @class BreweryComponent - Container component for
 * the BreweryList & Brewery Item (detail) components.
 * It receives the list of breweries from the app-level
 * & disseminates them to the sub-components, along with some internal state.
 * 
 * @see onSelect method, which is used to ensure data consistency across
 * state representations
 */
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

    /**
     * @method onSelect - Handles setting the `selectedBrewery` state and
     * the `isOpen` state.
     * Since the modal must be open when something is selected, and closed
     * when it's deselected, this is used to normalize the state between the two
     * sub-components
     * 
     * @param {(Object|null)} selectedBrewery
     * @returns {(Object|false)}
     */
    onSelect(selectedBrewery) {
        if (!selectedBrewery) {
            this.setState({
                selectedBrewery: null,
                isOpen: false
            })
            return false
        }

        this.setState({
            selectedBrewery,
            isOpen: true
        })
        return selectedBrewery
    }
}


export default BreweryComponent
