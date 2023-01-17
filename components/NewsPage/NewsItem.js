function NewsItem(props){

    let element = props.element
    let url = element.link.replace('https://admin.pascalegirardin.art/', "/")

    
    return (
        <div className="news__item">
            <a href={`news/${url}`}>
                <div className="news-header news-header--none">
                    <h2 className="news-header__title">
                        <span>{element.title.rendered}</span>
                        <div className="news-header__subtitle">
                            {element.acf.title_2}
                        </div>
                    </h2>
                    <ul className="news-header__detail">
                        <li>{element.acf.subtitle}</li>
                        <li className="dates">{element.acf.dates}</li>
                    </ul>
                </div>
            </a>
        </div>
    )
}
export default NewsItem