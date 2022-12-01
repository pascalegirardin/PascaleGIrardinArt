import React from "react"
import { withIntl } from '../i18n' 
import Layout from "../components/Layout"
import useFetch from "../components/Hooks/useFetch"

const NewsTemplate = ( {pageContext} ) => {

    let [blogPost] = useFetch(`posts?include[]=${pageContext.id}`)

    return blogPost === null ?<></>: (
        <Layout title={blogPost[0].title.rendered} description={blogPost[0].excerpt.rendered} pageContext={pageContext} >
            <div id="article" className="article">
                <div className="article__wrap">
                    <div className="article__header">
                        <div className="news-header news-header--single">
                            <h2 className="news-header__title">
                                <span>{blogPost[0].title.rendered}</span>
                                <div className="news-header__subtitle">{blogPost[0].acf.subtitle}</div>
                            </h2>
                            <ul className="news-header__detail">
                                <li className="dates">{blogPost[0].acf.dates}</li>
                            </ul>
                        </div>
                    </div>
                    <div className="article__main">
                        <div className="article__content">
                            <div className="news">
                                <div className="news__content">
                                    <div dangerouslySetInnerHTML={{ __html: blogPost[0].content.rendered }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default withIntl(NewsTemplate)