// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"

// normalize CSS across browsers
import "./src/css/normalize.css"

// custom CSS styles
import "./src/css/style.css"
//import "./src/css/font.css"

import React from 'react'
import { GlobalContextProvider } from './src/context/GlobalContext'

export const wrapRootElement = ({ element }) => (
    <GlobalContextProvider>{element}</GlobalContextProvider>
) 
