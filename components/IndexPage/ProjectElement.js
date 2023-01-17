import classNames from "classnames";

function ProjectElement ({element, media}) {                                   //console.log(element)

    let image
    media.forEach((i) => {
        i.id == element.featured_media
        ? image = i
        : void(0)
    })

    let uri = element.type === 'exposition' 
    ? `expositions/${element.slug}`
    : `projects/${element.slug}`
    console.log(uri)

    return image === null ? <></> :(
        <>
            <div className="project-thumb__row">
                <div className={classNames(
                    'project-thumb__image',
                    `project-thumb__image--${element.acf.size}`,
                    `project-thumb__image--${element.acf.align}`,
                )}>
                    <a className="project-thumb__link" href={uri}>
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