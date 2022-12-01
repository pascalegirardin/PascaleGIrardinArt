import React from "react";
import ProjectItem from "./ProjectItem";

function ListOfProjects ({projects, hash, current }){
    return(
        <div className="projects__list">
            {
                hash === '' 
                ? projects.map( element => <ProjectItem element={element}/> )
                : projects.map( element => { 
                    return element.categories.includes(current)
                    ? <ProjectItem element={element}/> 
                    : void(0)
                }) 
            }
        </div>
    )
}
export default ListOfProjects;