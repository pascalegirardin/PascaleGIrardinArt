import React from "react"

function ProjectItem({element}){

    return (
        <div className="projects__item" >
            <a href={`/${element.slug}`}>
                <div className="project-header project-header--none">
                    <h2 className="project-header__title">{element.title.rendered}</h2>
                    <ul className="project-header__detail">
                        {
                            element.acf.subtitle &&(
                                <li  dangerouslySetInnerHTML={{ __html: element.acf.subtitle}} />
                            )
                        } 
                        {   
                            element.acf.dates === null ||  element.acf.dates  === undefined
                            ? <></>
                            : <li className="dates">{element.acf.dates }</li>
                        }
                    </ul>
                </div>
            </a>
        </div> 
    )
}
export default ProjectItem