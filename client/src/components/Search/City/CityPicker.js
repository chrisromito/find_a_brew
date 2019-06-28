import '@material/react-list/index.scss'
import React, { Component } from 'react'
import { sortBy } from 'ramda'


export const cityDisplayValue = (city)=> `${city.city_ascii}, ${city.state.abbreviation}`


const sortByDisplayValue = sortBy(cityDisplayValue)


export class CityPicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
    }

    render() {
        const cities = this.state.loading
            ? []
            : sortByDisplayValue(this.props.cities)
        const onCitySelect = (e)=> this.props.onCitySelect(e.target.getAttribute('data-id'))
        const openClass = this.props.open ? 'citypicker--open' : 'citypicker--closed'
        const pickerClass = openClass + ' citypicker'
        return (
            <div id='citypicker' className={pickerClass}>
                <div className='citypicker--container'>
                    {( this.state.loading
                        ? <div className='citypicker--spinner-container'><i className='mdi mdi-loading citypicker--spinner'></i></div>
                        : cities.map((city, index) => (
                        <div className='citypicker--item' key={index} data-id={city.id}
                                onClick={onCitySelect}>
                            {cityDisplayValue(city)}
                        </div>
                        ))
                    )}
                </div>
            </div>
        )
    }
}

export default CityPicker