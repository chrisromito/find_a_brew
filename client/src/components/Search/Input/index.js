import React, { Component } from 'react';
import '@material/react-text-field/index.scss';
import TextField, {HelperText, Input} from '@material/react-text-field';

// import './index.scss';C



export class SearchInput extends Component {
    constructor(props) {
        super(props)
        this.state = { value: '' }
    }

    render() {
        return (
            <div>
                <TextField
                    label='Search'
                    helperText={<HelperText>Enter the name of the Brewery You're Looking For</HelperText>}
                >
                    <Input
                        value={this.state.value}
                        onChange={(e)=> this.setState({ value: e.currentTarget.value })}>
                    </Input>
                </TextField>
            </div>
        )
    }
}

export default SearchInput;