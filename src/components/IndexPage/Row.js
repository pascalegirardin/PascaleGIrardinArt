import React from "react"
import ProjectElement from "./ProjectElement"
import NewsElement from "./NewsElement"

export const Row = ({element}) => { 

    return element.type === "project" 
    ? <ProjectElement 
        element={element}
        key={element.date}
        /> 
    : <NewsElement
        element={element}
        key={element.date}
        /> 
}

/* import React from "react"
import ProjectElement from "./ProjectElement"
import NewsElement from "./NewsElement"

export const Row = ({element}) => { 

    return element.node.type === "project" 
    ? <ProjectElement 
        element={element}
        key={element.date}
        /> 
    : <NewsElement
        element={element}
        key={element.date}
        /> 
} */