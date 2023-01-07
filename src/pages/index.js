import React from "react";
import { useEffect, useState } from 'react';
import { withIntl } from '../i18n'
import PostsToShow from '../components/IndexPage/PostToShow';
import Layout from '../components/Layout';

function IndexPage ({pageContext}) {

    let [firstChunk, setFirstChunk] = useState(null)
    let [lastChunk, setLastChunk] = useState(null)

    const posts = pageContext.posts
    const projects = pageContext.projects
    const expositions = pageContext.expositions

    console.log(expositions)

    const SortChronogically = () => {
        let x = projects.concat(posts)
        let xx = x.concat(expositions)                                                  // x is all the posts and all of the projects
        xx.sort((a, b) => {
            const dateA = new Date(a.date)
            const dateB = new Date(b.date)
            return dateA - dateB
        })
        .reverse()
        let y = []                                                                      // y is only the ones in the current lang
        xx.forEach(element => {
            element.polylang_current_lang.includes(pageContext.locale) 
            ? y.push(element)
            :void(0)
        });

        setFirstChunk( y.slice(0, 5) )                                                  // show the first five first
        setLastChunk ( y.slice(5))                                                      // show all of the rest next
    }
        useEffect(() => { SortChronogically() }, [pageContext.locale]); 

    return(
        <Layout title='Pascale Girardin' description="Page d'accueil" pageContext={pageContext}>
            <PostsToShow 
                firstChunk={firstChunk}
                lastChunk={lastChunk}
                pageContext={pageContext}
            />
        </Layout>
    )
    
}
export default withIntl(IndexPage)