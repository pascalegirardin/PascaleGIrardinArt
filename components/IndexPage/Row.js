import React from "react"
import ProjectElement from "./ProjectElement"
import NewsElement from "./NewsElement"

export const Row = ({element, pageContext, media}) => { 

    return element.type === "project" || element.type === "exposition"
    ? <ProjectElement 
        element={element}
        key={element.date}
        pageContext={pageContext}
        media={media}
        /> 
    : <NewsElement
        element={element}
        key={element.date}
        pageContext={pageContext}
        /> 
}