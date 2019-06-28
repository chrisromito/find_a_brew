import '@material/react-text-field/index.scss'
import * as R from 'ramda'
import React, { Component } from 'react'
import TextField, { HelperText, Input } from '@material/react-text-field'
import { debounce } from '../../utils'


export class SearchInput extends Component {
    constructor(...props) {
        super(...props)
        this.state = {
            value: ''
        }
        // Bind our debounceSearch function here, calling it in
        // the render method makes it work as a normal function
        this.debounceSearch = debounce((q) => this.onSearch(q), 500)
    }

    render() {
        // Pass the original arg to setState & call our debounced search function
        const handleSearch = R.pipe(
            R.tap((value) => this.setState({ value })),
            R.tap(this.debounceSearch)
        )
        return (
            <div className="text--text">
                <TextField
                    label='Search'
                    helperText={<HelperText className="text--text">Enter the name of the Brewery You're Looking For</HelperText>}>
                    <Input
                        value={this.state.value}
                        onChange={(e) => handleSearch(e.target.value)}>
                    </Input>
                </TextField>
            </div>
        )
    }

    onSearch(query) {
        this.props.onSearch(query)
        return query
    }
}

export default SearchInput
