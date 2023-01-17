function NewsHeading ({lang}){

    return (
        <h2 className="news__heading">
            <nav className="inline-nav">
                <div className="inline-nav__title">
                    <a aria-current="page" className="" href="/news">
                        { 
                            lang === 'fr_CA' 
                            ? 'Actualités'
                            : 'News'
                        }
                    </a>
                </div>
            </nav>
        </h2>
    )
}

export default NewsHeading
