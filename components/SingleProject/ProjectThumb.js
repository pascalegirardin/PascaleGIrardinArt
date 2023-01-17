import React from 'react'
import classnames from 'classnames'

function ProjectThumb ({ children, classMod }) {
    return (
        <div className={classnames('project-thumb', `project-thumb--${classMod}`)}>
            {children}
        </div>
    )
}
export default ProjectThumb