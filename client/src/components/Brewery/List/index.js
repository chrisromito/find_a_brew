import React, { Component } from 'react';
import './index.scss';


const loadingSpinner = ()=> (
    <div class="width--100 height--100">
        <i class="mdi mdi-loading"></i>
    </div>
)

// TODO: Make this a separate component that implements MDC List Component
const breweryListItem = (item)=> (
    <div> {item} </div>
)



export class BreweryList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            loading: false
        }
    }

    render() {
        const isLoading = this.state.loading
        return (
            <div>
                {isLoading ? (
                    loadingSpinner()
                ) :(
                    this.state.data.map(breweryListItem)
                )}
            </div>
        )
    }
}

export default BreweryList;