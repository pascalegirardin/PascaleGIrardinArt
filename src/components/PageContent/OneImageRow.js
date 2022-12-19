import React from "react";
import classnames from 'classnames'
import useFetch from "../Hooks/useFetch";

function OneImageRow ({ element, pageContext }) {

  const searchThis = (str) => {
    let x = str.substring(str.lastIndexOf("/") + 1);
    let y = `media?search=${x}`
    return y
  };
  let url = searchThis(element.image);

  let [image] = useFetch(url);

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
            
            <img src={image[0].source_url} alt="wow"/>
            <figcaption className="project-thumb__caption">
              <span dangerouslySetInnerHTML={{ __html: image[0].caption.rendered }} />
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  )
}
export default OneImageRow


/* import React from "react";
import classnames from 'classnames'
import useImage from "../Hooks/useImage";

function OneImageRow ({ element }) {

  let [data] = useImage();

  let image

  data.allRestMedias.edges.forEach((i) => {
      i.node.source_url === element.image
      ? image = i.node 
      : void(0)
  })


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
export default OneImageRow */