import React, { Component } from 'react';
import '@material/react-text-field/index.scss';
import TextField, {HelperText, Input} from '@material/react-text-field';
import { AutoComplete } from './AutoComplete'
// import './index.scss';C



export class CityInput extends Component {
    constructor(props) {
        super(props)
        this.state = { value: '' }
    }
    
    render() {
        return (
            <div>
                <TextField
                    label='Location'
                    helperText={<HelperText>Enter a City, State, and/or Zip Code</HelperText>}
                >
                    <Input
                        value={this.state.value}
                        onChange={(e)=> this.setState({ value: e.currentTarget.value })}>
                    </Input>
                </TextField>
                <AutoComplete></AutoComplete>
            </div>
        )
    }
}

export default CityInput;