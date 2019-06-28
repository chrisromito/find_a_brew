import * as R from 'ramda'
import React from 'react'


const breweryType = R.prop('type')


const eq = R.equals(R.__)


const iconConditions = R.cond([
    [eq('bar'), R.always('mdi mdi-cocktail')],
    [eq('brewpub'), R.always('mdi mdi-restaurant')],
    [R.anyPass([eq('contract'), eq('large'), eq('regional')]), R.always('mdi mdi-office-building')],
    [R.T, R.always('mdi mdi-beer')]
])


const getIconClass = R.compose(
    iconConditions,
    breweryType
)


export const getBreweryTypeIcon = (b)=> (<i className={getIconClass(b)}/>)
