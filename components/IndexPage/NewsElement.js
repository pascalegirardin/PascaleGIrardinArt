import React from "react";

function NewsElement ({element}) {

    return(
        <>
            <div className="project-thumb__text project-thumb__text--undefined project-thumb__text--undefined">
                <a className="project-thumb__link" href={`news/${element.slug}`}>
                    <div className="news-header news-header--none">
                        <h2 className="news-header__title">
                            {element.title.rendered && <span dangerouslySetInnerHTML={{ __html: element.title.rendered }} />}
                            <div className="news-header__subtitle">
                                {element.acf.title_2 && <span dangerouslySetInnerHTML={{ __html: element.acf.title_2 }} />}
                            </div>
                        </h2>
                        <ul className="news-header__detail">
                            {element.acf.dates && <span dangerouslySetInnerHTML={{ __html: element.acf.dates }} />}
                        </ul>
                    </div>
                </a> 
            </div>
        </>
    )
}
export default NewsElement