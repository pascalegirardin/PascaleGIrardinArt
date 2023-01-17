import Layout from "../../components/Layout"
import ProjectItem from "../../components/ProjectsPage/ProjectItem"
import { cherche } from "../../components/lib/lib"
import { useAppContext } from "../../components/context/context"

export default function Expos ({expositions, menus}) {

    let {pageContext} = useAppContext()
    let title = pageContext.locale === 'fr_CA' ? 'Expositions' : 'Exhibitions'

    let x = [] 
    expositions.forEach(element => {
        element.polylang_current_lang.includes(pageContext.locale) && element.status === "publish" 
        ? x.push(element)
        :void(0)
    });

    return x === null ? <></> : (
        <Layout 
            title='Pascale Girardin' pageContext={pageContext} menus={menus}>
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
                        x && x.map( element => <ProjectItem element={element} key={element.date} pageContext={pageContext} /> )
                    }
                </div>
            </div>
        </Layout>
    )
}

export async function getStaticProps() {
    const expositions = await cherche("expositions?per_page=100&page=1")
    const menus = await cherche("menus")
    return {
        props: {expositions, menus},
    }
}