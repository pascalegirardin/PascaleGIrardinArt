import React from "react";
import classnames from 'classnames'
import useImage from "../Hooks/useImage";

function OneImageRow ({ element }) {

  let [image] = useImage(element.image);


  return image === null || element === null ? <></> : (
    <div className={classnames(
      'project-thumb',
      `project-thumb--content`, 
    )}>
      <div className={classnames(
        'project-thumb__row ',
        `project-thumb__row--${element.align}`,
      )}>
        <div className={classnames(
          'project-thumb__image',
          `project-thumb__image--${element.size}`,
          `project-thumb__image--${element.align}`,
          { 'project-thumb__image--row': !! element.row }
        )}>
          <figure>
            
            <img src={image.source_url} alt="wow"/>
            <figcaption className="project-thumb__caption">
              <span dangerouslySetInnerHTML={{ __html: image.caption }} />
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  )
}
export default OneImageRow