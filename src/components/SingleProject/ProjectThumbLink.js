import React from 'react'
import { Link } from '../../i18n'

const ProjectThumbLink = ({ children, to, state, locale }) => {
    return (
        <Link 
            className="project-thumb__link" 
            to={to} state={state} locale={locale}>
            {children}
        </Link>
    )
}
export default ProjectThumbLink