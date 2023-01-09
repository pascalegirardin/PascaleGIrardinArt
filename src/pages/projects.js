import React, { useEffect, useState } from 'react'
import { withIntl } from '../i18n'
import Layout from '../components/Layout'
import ProjectItem from "../components/ProjectsPage/ProjectItem"

function ProjectsPage ({pageContext, location}) {
    
    let [projects, setProjects] = useState(null)
    let [projectsToShow, setProjectsToShow] = useState(null)
    let [current, setCurrent] = useState(null)
    
    const isBrowser = () => typeof window !== "undefined"
    const findHash = () => {
        let x
        if (isBrowser()) {
        const hash = window.location.hash
        x = window.location.hash.substring(1)
        }
        return x
    }
    let [hash, setHash] = useState(() => findHash());

    if (isBrowser()) {
        window.onhashchange = () => {
            setHash(window.location.hash.substring(1))
        }
    }

    
    let [projetMenu, setProjetMenu] = useState(null)

    let emptyProject = [{
        title: {
            rendered:" "
        },
        acf : {
            subtitle:'',
            dates:'',
        },
        link: '',
    }]
    
    const fetchProjects = () => {
        fetch( "https://admin.pascalegirardin.art/wp-json/wp/v2/projects?per_page=100&page=1" )
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

    const fetchCurrent = () => {
        fetch( "https://admin.pascalegirardin.art/wp-json/wp/v2/categories" )
        .then( (response) => response.json() )
        .then( (data) => {
            let x = [] 
            data.forEach(element => {
                element.polylang_current_lang.includes(pageContext.locale) 
                ? x.push(element)
                :void(0)
            });
            x.forEach( element => {
                element.slug === hash
                ? setCurrent(element.id)
                : void(0)
            })
        } )
        .catch((error) => console.log(error))
    }
        useEffect(() => { fetchCurrent() }, [hash])

    const fetchProjetMenu = () => {
        fetch( "https://admin.pascalegirardin.art/wp-json/wp-api-menus/v2/menus/" )
        .then( (response) => response.json() )
        .then( (data) => {
            let x
            data.forEach(element => {
                let nom = element.name
                nom.charAt(0) === 'f' && nom.includes(pageContext.locale) ? x = element : void(0)     // if the name of the menu starts with f it's definitely a footer menu also we want the right translation. technically the header is the same shit as the footer
            })                                                                          //console.log(x.meta.links.self)
            return fetch(x.meta.links.self)
        })
        .then( (response) => response.json())
        .then((data) => {let x = data.items[0] ; setProjetMenu(x)})                     //sorta hard coded... the item at the zero index is the project submenu  ///console.log(x);
        .catch((error) => console.log(error))
    }
        useEffect(() => { fetchProjetMenu() }, []);                                    //console.log(projetMenu)

    const listOfProjects = () => {
        if(projects !== null){
            let x = []
            current === null 
            ? projects.map( element => x.push(element) )
            : projects.map( element => { 
                element.categories.includes(current)
                ? x.push(element) 
                : void(0)
            })
            return x.length < 1 ? setProjectsToShow(emptyProject) : setProjectsToShow(x) ;
        }
    }
        useEffect(()=> {listOfProjects ()}, [projects, current] )

    return projectsToShow === null || projetMenu === null ? <></> : (
        <Layout title='Pascale Girardin' pageContext={pageContext}>
            <div className="projects">
                <h2 className="projects__heading">
                    <nav className="inline-nav">
                        <div className="inline-nav__title">
                            {projetMenu.title}
                        </div>
                        <ul className="inline-nav__items">
                            {
                                projetMenu.children.map((element, index) => {
                                    return(
                                        <li className="inline-nav__item" key={element.url}>
                                            <a 
                                                href={element.url}
                                                onClick={() => { setHash(element.object_slug); }}
                                            >
                                                <span className={element.object_slug == hash ? 'active' : ''}>{element.title}</span>
                                            </a>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </nav>
                </h2>
                <div className="projects__list">
                    {
                        projectsToShow && projectsToShow.map( element => <ProjectItem element={element} key={element.date} pageContext={pageContext} /> )
                    }
                </div>
            </div>
        </Layout>
    )
}
export default withIntl(ProjectsPage)