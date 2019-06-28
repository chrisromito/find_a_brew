import '@material/react-dialog/index.scss'
import './index.scss'
import * as R from 'ramda'
import React, { Component } from 'react'
import Dialog, {
    DialogContent,
    DialogFooter,
    DialogButton,
} from '@material/react-dialog'
import GoogleMapReact from 'google-map-react';
import { getBreweryTypeIcon } from '../shared'
import { GOOGLE_MAP_KEY } from '../constants'


/**
 * @class BreweryItem - Displays information
 * about a brewery, its location info, & Google map.
 */
export class BreweryItem extends Component {
    constructor(...props) {
        super(...props)
    }

    render() {
        const onClose = ()=> this.handleClose()
        const brewery = this.props.selectedBrewery
        return (
            <div className='brew--dialog'>
                {(brewery && this.props.isOpen) &&
                    <Dialog open={this.props.isOpen}
                            onClose={onClose}>
                        <DialogContent>
                            <h6 className='mdc-typography--headline6'>
                                {getBreweryTypeIcon(brewery)}
                                {brewery.name}
                            </h6>
                            <div className='width--100'>
                                <p className='mdc-typography--subtitle1'>
                                    <i className='mdi mdi-map-marker mdc-theme--secondary'></i>
                                    <b>Location</b>
                                </p>
                                <p className='mdc-typography--body2'>
                                    <span>{brewery.street}</span>
                                    <br/>
                                    <span>{brewery.city}, {brewery.state}</span>
                                    <br/>
                                    <span>{brewery.postal_code}</span>
                                </p>
                                <a className='mdc-button'
                                        href={getLink(brewery)}>
                                    <i className='mdi mdi-navigation'></i>
                                    Get Directions
                                </a>
                            </div>
                            <BreweryMap brewery={brewery}/>
                        </DialogContent>
                        <DialogFooter>
                            <DialogButton className='mdc-theme--secondary' action='dismiss'>Close</DialogButton>
                        </DialogFooter>
                    </Dialog>
                }
            </div>
        )
    }

    handleClose() {
        this.props.onClose()
    }
}


const getLink = (b)=> encodeURI(`https://www.google.com/maps/dir/${b.name} ${b.street} ${b.city}, ${b.state} ${b.postal_code}`)


/**
 * @private
 * @class BreweryMap - Renders a Google Map + a marker pointing
 * to the brewery
 */
class BreweryMap extends Component {
    constructor(props) {
        super(props)
        this.state = {
            center: {
                lat: 0,
                lng: 0
            }
        }
    }

    render() {
        const lat = Number(this.props.brewery.latitude)
        const lng = Number(this.props.brewery.longitude)
        const coordinates = { lat, lng }

        return (
            <div style={{ height: '750px', width: '100%' }}>
                <GoogleMapReact
                        bootstrapURLKeys={{ key: GOOGLE_MAP_KEY }}
                        yesIWantToUseGoogleMapApiInternals={true}
                        defaultCenter={coordinates}
                        defaultZoom={11}>
                    <Marker
                        lat={lat}
                        lng={lng}></Marker>
                </GoogleMapReact>

            </div>
        )
    }

}


const Marker = ({ lat, lng })=> (
    <div className='mdc-theme--secondary-bg'
        lat={lat}
        lng={lng}
        style={{
            alignItems: 'center',
            background: 'grey',
            borderRadius: '100%',
            color: 'white', 
            display: 'inline-flex',
            justifyContent: 'center',
            padding: '15px 10px',
            textAlign: 'center',
            transform: 'translate(-50%, -50%)'
      }}>
        <i className='mdi mdi-beer'></i>
    </div>
)