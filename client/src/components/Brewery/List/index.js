import '@material/react-list/index.scss'
import './index.scss'
import * as R from 'ramda'
import React, { Component } from 'react'
import List, { ListItem } from '@material/react-list'
import { BREWERY_TYPES } from '../constants'
import { getBreweryTypeIcon } from '../shared'

window.R = R


export class BreweryList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const isLoading = this.props.loading
        const filterPred = this.props.selectedCity && this.props.breweries
            ? cityNameLike(this.props.selectedCity)
            : R.T
        const breweries = this.props.breweries.filter(filterPred)
        return (
            <div>
                {isLoading ? (
                    <div class="width--100 height--100">
                        <i class="mdi mdi-loading"></i>
                    </div>
                ) : (
                        <BreweryList_
                            breweries={breweries}
                            onSelect={(breweryId)=> this.handleBrewerySelect(breweryId)}></BreweryList_>
                    )}
            </div>
        )
    }

    handleBrewerySelect(breweryId) {
        this.props.onSelect(
            R.find(R.propEq('id', Number(breweryId)), this.props.breweries)
        )
    }
}

export default BreweryList


//-- Display value formatting

const castToLowerCase = (s)=> String(s).toLowerCase().trim()


const caseInsensitiveIncludes = (a, b)=> castToLowerCase(a)
    .includes(castToLowerCase(b))


const cityNameLens = R.lensPath(['city'])


const cityNameLike = (selectedCity)=> R.compose(
    R.partial(
        caseInsensitiveIncludes,
        [
            R.view(
                cityNameLens,
                selectedCity
            )
        ]
    ),
    R.view(cityNameLens)
)


/**
 * @private @class BreweryList_
 * Renders Breweries when the component isn't loading.
 * Pushes selectedBrewery state up the component chain when a brewery is clicked
 */
class BreweryList_ extends Component {
    render() {
        const onSelect = (e)=> this.props.onSelect(e.currentTarget.dataset.id)
        return (
            <List className='brew-list' tag='div'>
                <ListItem className='brew-list--header'
                            tag='div'>
                        {breweryColumns.map((name, index)=> (
                            <div key={index}
                                    className={cellClass(name, true)}>
                                {columnNameMap[name]}
                            </div>
                        ))}
                </ListItem>
                {this.props.breweries.map((b, index) => (
                    <ListItem
                            key={index}
                            onClick={onSelect}
                            data-id={b.id}
                            tag='div'
                            className='brew-list--item'>
                        <div className='mdc-list-item__text'>
                            {(
                                breweryColumns.map((column, colIndex)=>
                                    breweryCell(column, colIndex, b))
                            )}
                        </div>
                    </ListItem>
                ))}
            </List>
        )
    }
}


const breweryCell = (key, colIndex, brewery)=> (
    <div key={colIndex}
            className={cellClass(key)}>
        <div className='brew-list--text mdc-typography--body1'>
            {R.prop(key, brewerySpec)(brewery)}
        </div>
    </div>
)


const cellClass = (name, header=false)=> `brew-list--cell brew-list--${name} ${ header ? 'mdc-typography--headline6' : ''}`


//-- Faux-column data mapping

const breweryColumns = [
    'type',
    'name',
    'website_url',
    'address'
]


const columnNameMap = {
    type: '',
    name: 'Name',
    website_url: 'Site',
    address: 'Location'
}


const brewerySpec = {
    type: R.pipe(R.prop('type'), getBreweryTypeIcon),
    name: R.prop('name'),
    website_url: R.pipe(
        R.prop('website_url'),
        (url)=> (<a href={url} target='_blank'>{url}</a>)
    ),
    address: (b)=> (
        <span>
            <span>{b.street}</span>
            <br/>
            <span>{b.city}, {b.state}</span>
            <br/>
            <span>{b.postal_code}</span>
        </span>
    )
}


