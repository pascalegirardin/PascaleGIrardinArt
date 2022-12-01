import React from 'react'
import { useEffect, useState } from 'react';
import { withIntl } from '../i18n'
import NewsHeading from '../components/NewsPage/NewsHeading';
import NewsItem from '../components/NewsPage/NewsItem';
import Layout from '../components/Layout'

function NewsPage ({pageContext}) {

    let [posts, setPosts] = useState(null)
    const fetchPosts = () => {
        fetch( "http://admin.pascalegirardin.art/wp-json/wp/v2/posts" )
        .then( (response) => response.json() )
        .then( (data) => {
            let x = [] 
            data.forEach(element => {
                element.polylang_current_lang.includes(pageContext.locale) && element.status === "publish" 
                ? x.push(element)
                :void(0)
            });
            setPosts(x) 
        } )
    }
        useEffect(() => { fetchPosts() }, []); 

    return posts === null ? <></> : (
        <Layout title='Pascale Girardin' pageContext={pageContext} >
            <div className="news">
                <NewsHeading lang={pageContext.locale}/>
                <div className="news__list">
                    { posts.map( element => <NewsItem element={element} key={element.date}/> ) }
                </div>
            </div>
        </ Layout>
    )
}
export default withIntl(NewsPage)