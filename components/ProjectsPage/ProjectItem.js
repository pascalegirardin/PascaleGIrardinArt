function ProjectItem({element, pageContext}){

    let url = element.link.split('art/')[1]

    let realUrl = element.type === 'exposition'
        ? url.split('exposition/')[0] + url.split('exposition/')[1]
        : url.split('project/')[0] + url.split('project/')[1]

    return (
        <div className="projects__item" >
            <a href={`${element.type}s/${realUrl}`}>
                <div className="project-header project-header--none">
                    <h2 className="project-header__title">{element.title.rendered}</h2>
                    <ul className="project-header__detail">
                        {
                            element.acf.subtitle &&(
                                <li  dangerouslySetInnerHTML={{ __html: element.acf.subtitle}} />
                            )
                        } 
                        {   
                            element.acf.dates === null ||  element.acf.dates  === undefined
                            ? <></>
                            : <li className="dates">{element.acf.dates }</li>
                        }
                    </ul>
                </div>
            </a>
        </div> 
    )
}
export default ProjectItem