import React from "react";
import { createContext, useContext, useState } from 'react'

const defaultLang = 'fr'
const defaultVisibility = false
const GlobalContext = createContext(defaultLang)

export const GlobalContextProvider = ({ children }) => {
    const [lang, setLang] = useState(defaultLang)
    const updateLang = (data) => setLang(data)

    const [showMenu, setMenu] = useState(defaultVisibility)
    const updateShowMenu = (data) => setMenu(data)
    
    const contextValues = {
        lang,
        updateLang,
        showMenu,
        updateShowMenu
    }
    return <GlobalContext.Provider value={contextValues}>{children}</GlobalContext.Provider>
}

export const useGlobalContext = () => {
    const context = useContext(GlobalContext)
    if (context === undefined || context === null) {
        throw new Error(`Tabarouette`)
    }
    return context
}