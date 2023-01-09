import React, { useEffect, useState } from 'react'
import { withIntl } from '../i18n'
import Layout from '../components/Layout'
import ProjectItem from "../components/ProjectsPage/ProjectItem"

function Expos ({pageContext, location}) {
    
    let [projects, setProjects] = useState(null)
    let title = pageContext.locale === 'fr_CA' ? 'Expositions' : 'Exhibitions'

    const fetchProjects = () => {
        fetch( "https://admin.pascalegirardin.art/wp-json/wp/v2/expositions" )
        .then( (response) => response.json() )
        .then( (data) => {
            let x = [] 
            data.forEach(element => {
                element.polylang_current_lang.includes(pageContext.locale) && element.status === "publish" 
                ? x.push(element)
                :void(0)
            });
            setProjects(x) 
        } )
        .catch((error) => console.log(error))
    }
        useEffect(() => { fetchProjects() }, []); 

    return projects === null ? <></> : (
        <Layout title='Pascale Girardin' pageContext={pageContext}>
            <div className="projects">
                <h2 className="projects__heading">
                    <nav className="inline-nav">
                        <div className="inline-nav__title">
                            {title}
                        </div>
                    </nav>
                </h2>
                <div className="projects__list">
                    {
                        projects && projects.map( element => <ProjectItem element={element} key={element.date} pageContext={pageContext} /> )
                    }
                </div>
            </div>
        </Layout>
    )
}
export default withIntl(Expos)