import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from "../../components/Layout"
import ProjectItem from "../../components/ProjectsPage/ProjectItem"
import { cherche } from '../../components/lib/lib'
import { useAppContext } from '../../components/context/context'


export default function ProjectsPage ({ allProjects, menus, categories}) {

    let {pageContext} = useAppContext()
    let [projectsToShow, setProjectsToShow] = useState(null)
    let [projetMenu, setProjetMenu] = useState(null)
    let current, hash

    let projects = [] 
    allProjects.forEach(element => {
        element.polylang_current_lang.includes(pageContext.locale) && element.status === "publish" 
        ? projects.push(element)
        :void(0)
    })

    const fetchProjetMenu = () => {
        let x
        menus.forEach(element => {
            let nom = element.name
            nom.charAt(0) === 'f' && nom.includes(pageContext.locale) ? x = element : void(0)     // if the name of the menu starts with f it's definitely a footer menu also we want the right translation. technically the header is the same shit as the footer
        })                                                                          //console.log(x.meta.links.self)
        fetch(x.meta.links.self)
        .then( (response) => response.json())
        .then((data) => {let x = data.items[0] ; setProjetMenu(x)})                     //sorta hard coded... the item at the zero index is the project submenu  ///console.log(x);
        .catch((error) => console.log(error))
    }
    useEffect(() => { fetchProjetMenu() }, []);                                    //console.log(projetMenu)

    const router = useRouter();

    function listOfProjects(xo) {
        let x = [] 
        let y = []
        hash = xo === undefined ? undefined : xo.split('#')[1]
        
        categories.forEach(element => {
            element.polylang_current_lang.includes(pageContext.locale) 
            ? x.push(element)
            :void(0)
        });
        x.forEach( element => {
            element.slug === hash
            ? current = element.id
            : void(0)
        })
        console.log(current)
        current === undefined
        ? projects.map( element => y.push(element) )
        : projects.map( element => { 
            setProjectsToShow(null)
            element.categories.includes(current)
            ? y.push(element) 
            : void(0)
        })
        return setProjectsToShow(y) ;
    }

    useEffect(() => {
        const onHashChangeStart = (url) => {listOfProjects(url)};
        router.events.on("hashChangeStart", onHashChangeStart);

        return () => {
            router.events.off("hashChangeStart", onHashChangeStart);
        };
    }, [router.events]);

    useEffect(() => { listOfProjects() }, []);

    return projectsToShow === null || projetMenu === null ? <></> : (
        <Layout 
            title='Pascale Girardin' pageContext={pageContext} menus={menus}>
            <div className="projects">
                <h2 className="projects__heading">
                    <nav className="inline-nav">
                        <div className="inline-nav__title">
                            <Link href='/projects'>
                                {projetMenu.title}
                            </Link>
                        </div>
                        <ul className="inline-nav__items">
                            {
                                projetMenu.children.map((element, index) => {
                                    return(
                                        <li className="inline-nav__item" key={element.url}>
                                            <Link href={element.url}>
                                                <span className={element.object_slug == hash ? 'active' : ''}>{element.title}</span>
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </nav>
                </h2>
                <div className="projects__list">
                    { projectsToShow && projectsToShow.map( 
                        element => <ProjectItem element={element} key={element.date} pageContext={pageContext} /> )
                    }
                </div>
            </div>
        </Layout>
    ) 
}

export async function getStaticProps() {
    const allProjects = await cherche("projects?per_page=100&page=1")
    const menus = await cherche("menus")
    const categories = await cherche("categories")
    return {
        props: { allProjects, menus, categories},
    }
}