import React from 'react'
import ProjectItem from "./ProjectItem"
//import { useStaticQuery, graphql } from "gatsby"


function ProjectsList ({projectsToShow}){
    return (
        <div className="projects__list">
            {projectsToShow && 
                projectsToShow.map( element => 
                    <ProjectItem 
                        element={element} 
                        key={element.date} 
                    /> 
                )
            }
        </div>
    )
}
export default ProjectsList