import React from "react";
import classNames from "classnames";
import useFetch from "../Hooks/useFetch";
import useFeaturedImage from "../Hooks/useFeaturedImage";

function ProjectElement ({element}) {                                  //console.log(element.node.featured_media)

    let image = useFeaturedImage(element.node.featured_media);


    return image === null ? <></> :(
        <>
            <div className="project-thumb__row">
                <div className={classNames(
                    'project-thumb__image',
                    `project-thumb__image--${element.node.acf.size}`,
                    `project-thumb__image--${element.node.acf.align}`,
                )}>
                    <a className="project-thumb__link" href={element.node.slug}>
                        <figure>
                            <img src={image.source_url} alt="wow"/>
                            <figcaption className="project-thumb__caption">
                                <div className={classNames(
                                    'project-header',
                                    'project-header--none',
                                )}>
                                    <h2 className="project-header__title">{element.node.title.rendered}</h2>
                                    <ul className="project-header__detail">
                                        {element.node.acf.subtitle && <li dangerouslySetInnerHTML={{ __html: element.node.acf.subtitle }} />}
                                        {element.node.acf.place && <li dangerouslySetInnerHTML={{ __html: element.node.acf.place }} />}
                                        {element.node.acf.dates && <li className="dates" dangerouslySetInnerHTML={{ __html: element.node.acf.dates }} />}
                                    </ul>
                                </div>
                            </figcaption>
                        </figure>
                    </a>
                </div>
            </div>
        </>
    )
}
export default ProjectElement