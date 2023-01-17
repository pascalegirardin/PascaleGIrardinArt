import Link from "next/link"

/* const ProjectThumbLink = ({ children, to, state, locale }) => {
    return (
        <Link 
            className="project-thumb__link" 
            to={to} state={state} locale={locale}>
            {children}
        </Link>
    )
}
export default ProjectThumbLink */

const ProjectThumbLink = ({ children, to, state, locale }) => {
    return (
        <Link 
            className="project-thumb__link" 
            href={to} state={state} locale={locale}>
            {children}
        </Link>
    )
}
export default ProjectThumbLink