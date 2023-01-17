// src/context/state.js
import { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
    const x =  { locale : 'fr_CA', }
    const [pageContext, setPageContext] = useState(x);
    const updatePageContext = (xx) => { setPageContext(xx) };

    const value = { pageContext, updatePageContext };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}