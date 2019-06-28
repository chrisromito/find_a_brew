import * as R from 'ramda'
import React from 'react'


const breweryType = R.prop('type')


const eq = R.equals(R.__)


/**
 * @func iconConditions
 * @sig iconConditions (a) -> b
 * @param {Object} brewery - The 'type' prop is used to determine
 * which icon to associate w/ different types of breweries.
 * Ex. a cocktail icon for bars, restaurant (silverware) icon for brew pubs, etc.
 * @returns {String} css class(es)
 */
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
