import React, { Component } from 'react';


/**
 * @typedef {Object} State
 * @property {Number} id
 * @property {String} name
 * @property {String} abbreviation
 */


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


export class AutoComplete extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            selection: null,
        }
    }
    
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default AutoComplete;