import React from "react";
import { useEffect, useState } from 'react';
import { withIntl } from '../i18n'
import PostsToShow from '../components/IndexPage/PostToShow';
import Layout from '../components/Layout';

function IndexPage ({pageContext}) {

    let [firstChunk, setFirstChunk] = useState(null)
    let [lastChunk, setLastChunk] = useState(null)

    let posts, projects
    
    const fetchBoth = () => {
        fetch( "https://admin.pascalegirardin.art/wp-json/wp/v2/projects?per_page=100&page=1" )
        .then( (response) => response.json() )
        .then( (data) => {
            projects = data;                                                                    // console.log(`PROJECTS${data}`)
            return fetch("https://admin.pascalegirardin.art/wp-json/wp/v2/posts")
        })
        .then( (response) => response.json() )
        .then((data) => {
            posts = data;                                                                       // console.log(`POST${data}`)
        }) 
        .then(() => {
            if(projects !== null && posts !== null) {
                let x = projects.concat(posts)                                                  // x is all the posts and all of the projects
                x.sort((a, b) => {
                    const dateA = new Date(a.date)
                    const dateB = new Date(b.date)
                    return dateA - dateB
                })
                .reverse()

                let y = []                                                                      // y is only the ones in the current lang
                x.forEach(element => {
                    element.polylang_current_lang.includes(pageContext.locale) 
                    && element.status === "publish" 
                    ? y.push(element)
                    :void(0)
                });
                setFirstChunk( y.slice(0, 5) )                                                  // show the first five first
                setLastChunk ( y.slice(5))                                                      // show all of the rest next
            }
        })
        .catch((error) => console.log('tabarouette'))
    }
        useEffect(() => { fetchBoth() }, [pageContext.locale]); 

    return(
        <Layout title='Pascale Girardin' description="Page d'accueil" pageContext={pageContext}>
            <PostsToShow firstChunk={firstChunk}lastChunk={lastChunk}/>
        </Layout>
    )
    
}
export default withIntl(IndexPage)