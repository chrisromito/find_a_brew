import React from 'react'
import ReactDOM from 'react-dom';

window.ReactDOM = ReactDOM

import('./app')
    .then(({ App })=> 
        ReactDOM.render(<App />, document.getElementById('app'))
    )
