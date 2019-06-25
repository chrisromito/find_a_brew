import React from 'react'
import '@material/react-text-field/index.scss'
import TextField, {HelperText, Input} from '@material/react-text-field'
import { debounce } from '../../utils'


const handleSearch = (onSearch)=> debounce(onSearch, 100)

export const SearchInput = ({ onSearch, search })=> (
    <div className="text--text">
        <TextField
            label='Search'
            helperText={<HelperText>Enter the name of the Brewery You're Looking For</HelperText>}>
            <Input
                value={search}
                onChange={handleSearch(onSearch)}>
            </Input>
        </TextField>
    </div>
)

export default SearchInput
