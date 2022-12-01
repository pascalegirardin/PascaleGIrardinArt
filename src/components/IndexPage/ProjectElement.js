import React from "react";
import classNames from "classnames";
import useFetch from "../Hooks/useFetch";

function ProjectElement ({element}) {                                   //console.log(element)

    let [image] = useFetch(`media/${element.featured_media}`);

    return image === null ? <></> :(
        <>
            <div className="project-thumb__row">
                <div className={classNames(
                    'project-thumb__image',
                    `project-thumb__image--${element.acf.size}`,
                    `project-thumb__image--${element.acf.align}`,
                )}>
                    <a className="project-thumb__link" href={element.slug}>
                        <figure>
                            <img src={image.source_url} alt="wow"/>
                            <figcaption className="project-thumb__caption">
                                <div className={classNames(
                                    'project-header',
                                    'project-header--none',
                                )}>
                                    <h2 className="project-header__title">{element.title.rendered}</h2>
                                    <ul className="project-header__detail">
                                        {element.acf.subtitle && <li dangerouslySetInnerHTML={{ __html: element.acf.subtitle }} />}
                                        {element.acf.place && <li dangerouslySetInnerHTML={{ __html: element.acf.place }} />}
                                        {element.acf.dates && <li className="dates" dangerouslySetInnerHTML={{ __html: element.acf.dates }} />}
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