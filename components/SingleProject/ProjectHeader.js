import React from 'react'
  
const ProjectHeader = ({ title, subtitle, place, dates, classMod }) => {
  return (
    <div className="article__header">
      <div className={`project-header project-header--${classMod}`}>
        <h2
          className="project-header__title"
          dangerouslySetInnerHTML={{ __html: title || 'No title' }}
        />
        <ul className="project-header__detail">
          {subtitle && <li dangerouslySetInnerHTML={{ __html: subtitle }} />}
          {place && <li dangerouslySetInnerHTML={{ __html: place }} />}
          {dates && <li className="dates" dangerouslySetInnerHTML={{ __html: dates }} />}
        </ul>
      </div>
    </div>
  )
}

ProjectHeader.defaultProps = {
  classMod: 'none',
}

export default ProjectHeader