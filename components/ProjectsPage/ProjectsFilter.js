function ProjectsFilter({projetMenu, setHash, hash}) {
    
    return  projetMenu === null ? <></> :(
        <h2 className="projects__heading">
            <nav className="inline-nav">
                <div className="inline-nav__title">
                    {projetMenu.title}
                </div>
                <ul className="inline-nav__items">
                    {projetMenu.children.map((element, index) => {
                        
                        return (
                            <li className="inline-nav__item" 
                                key={element.url}>
                                
                                <a href={element.url}
                                    onClick={() => { 
                                        setHash(element.object_slug); 
                                }}>
                                    <span className={
                                            element.object_slug == hash 
                                            ? 'active' 
                                            : ''
                                    }>
                                        {element.title}
                                    </span>
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </h2>
    )
}
export default ProjectsFilter