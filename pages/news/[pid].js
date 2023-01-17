import { useRouter } from 'next/router'
import { cherche } from '../../components/lib/lib'
import { useAppContext } from '../../components/context/context'
import Layout from "../../components/Layout";


export default function Post({blogPost, menus}) {

    const {pageContext} = useAppContext()

    const router = useRouter()
    const { pid } = router.query


    return (
        <Layout 
            title={blogPost[0].title.rendered} 
            description={blogPost[0].excerpt.rendered}
            menus={menus}
            pageContext={pageContext}
            >
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

export async function getStaticProps(pid) {
    const blogPost = await cherche(`posts?slug=${pid.params.pid}`)
    const menus = await cherche("menus")
    return {
        props: {blogPost, menus},
    }
}

export async function getStaticPaths() {

    const posts = await cherche("posts")
    let paths = []
    posts.map(expo => {
        paths.push(`/news/${expo.slug}`)
    })
    console.log(paths)
    return {
        paths,
        fallback: false,
    }
}