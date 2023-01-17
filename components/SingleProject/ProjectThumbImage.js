import React from 'react'
import classnames from 'classnames'
import ProjectThumbLink from './ProjectThumbLink'

export const ProjectThumbImage = ({
    size, align, row, to, locale, caption, title,
    nextLink,prevLink, onClick, source_url
}) => {
    let image = null

    const cap = React.isValidElement(caption) ? (
        <figcaption className="project-thumb__caption">{caption}</figcaption>
    ) : (
        <figcaption className="project-thumb__caption">
            {title && (
                <>
                    <span dangerouslySetInnerHTML={{ __html: title }} /> –{' '}
                </>
            )}
            <span dangerouslySetInnerHTML={{ __html: caption }} />
        </figcaption>
    )

    image = (
        <figure>
            <img 
                src={source_url}
                alt="wow"
            />
            {caption && cap}
        </figure>
    )

    if (to) {
        image = (
            <ProjectThumbLink to={to} state={{ nextLink, prevLink }} locale={locale}>
                {image}
            </ProjectThumbLink>
        )
    }

    return (
    <div
        className={classnames(
            'project-thumb__image',
            `project-thumb__image--${size}`,
            `project-thumb__image--${align}`,
            { 'project-thumb__image--row': !!row }
        )}
        onClick={onClick}
    >
        {image}
    </div>
    )
}
export default ProjectThumbImage