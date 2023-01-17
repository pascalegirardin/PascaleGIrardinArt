import NewsHeading from '../../components/NewsPage/NewsHeading';
import NewsItem from '../../components/NewsPage/NewsItem';
import Layout from '../../components/Layout'
import { useAppContext } from '../../components/context/context';
import { cherche } from '../../components/lib/lib';


export default function NewsPage ({posts, menus}) {

    let {pageContext} = useAppContext()

    let x = [] 
    posts.forEach(element => {
        element.polylang_current_lang.includes(pageContext.locale) && element.status === "publish" 
        ? x.push(element)
        :void(0)
    })

    return x === null ? <></> : (
        <Layout 
            title='Pascale Girardin' pageContext={pageContext} menus={menus}>
            <div className="news">
                <NewsHeading lang={pageContext.locale}/>
                <div className="news__list">
                    { x.map( element => <NewsItem element={element} key={element.date}/> ) }
                </div>
            </div>
        </ Layout>
    )
}

export async function getStaticProps() {
    const posts = await cherche("posts")
    const menus = await cherche("menus")
    return {
        props: {posts, menus},
    }
}