import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import { cherche, getMedia } from '../components/lib/lib';
import PostsToShow from '../components/IndexPage/PostToShow';
import { useAppContext } from '../components/context/context';


function IndexPage ({posts, projects, expositions, media, menus}){

  let {pageContext} = useAppContext()

  let [firstChunk, setFirstChunk] = useState([])
  let [lastChunk, setLastChunk] = useState(null)

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
        pageContext.locale.includes(element.polylang_current_lang) 
        ? y.push(element)
        :void(0)
    });

    setFirstChunk( y.slice(0, 5) )                                                  // show the first five first
    setLastChunk ( y.slice(5))                                                      // show all of the rest next
  }
    useEffect(() => { SortChronogically() }, [pageContext.locale]);
    
    return(
      <Layout title='Pascale Girardin' description="Page d'accueil" pageContext={pageContext} menus={menus}>
        <PostsToShow firstChunk={firstChunk}lastChunk={lastChunk} pageContext={pageContext} media={media}/>
      </Layout>
    )
    
}

export async function getStaticProps() {

  const posts = await cherche("posts")
  const projects = await cherche("projects?per_page=100&page=1")
  const expositions = await cherche("expositions?per_page=100&page=1")
  const media = await getMedia()
  const menus = await cherche("menus")

  return {
    props: {posts, projects, expositions, media, menus},
  }
}

export default IndexPage