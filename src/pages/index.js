import React from "react";
import { useEffect, useState } from 'react';
import { withIntl } from '../i18n'
import PostsToShow from '../components/IndexPage/PostToShow';
import Layout from '../components/Layout';
import useRestPosts from '../components/Hooks/useRestPosts'
import useRestProjects from '../components/Hooks/useRestProjects'

function IndexPage ({pageContext}) {

    let [firstChunk, setFirstChunk] = useState(null)
    let [lastChunk, setLastChunk] = useState(null)

    const posts = useRestPosts()
    const projects = useRestProjects()

    const SortChronogically = () => {
        let x = projects.concat(posts)                                                  // x is all the posts and all of the projects
        x.sort((a, b) => {
            const dateA = new Date(a.node.date)
            const dateB = new Date(b.node.date)
            return dateA - dateB
        })
        .reverse()
        let y = []                                                                      // y is only the ones in the current lang
        x.forEach(element => {
            element.node.polylang_current_lang.includes(pageContext.locale) 
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