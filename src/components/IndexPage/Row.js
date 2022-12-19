import React from "react"
import ProjectElement from "./ProjectElement"
import NewsElement from "./NewsElement"

export const Row = ({element, pageContext}) => { 

    return element.type === "project" 
    ? <ProjectElement 
        element={element}
        key={element.date}
        pageContext={pageContext}
        /> 
    : <NewsElement
        element={element}
        key={element.date}
        pageContext={pageContext}
        /> 
}