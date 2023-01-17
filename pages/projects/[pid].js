import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { cherche } from '../../components/lib/lib'
import { useAppContext } from '../../components/context/context'
import PageContent from "../../components/PageContent/PageContent";
import ProjectThumb from "../../components/SingleProject/ProjectThumb";
import ProjectHeader from "../../components/SingleProject/ProjectHeader";
import ProjectThumbImage from "../../components/SingleProject/ProjectThumbImage"
import Layout from "../../components/Layout";


export default function Post({wordpressPage, featured_mediaID, menus}) {

    const {pageContext} = useAppContext()

    const router = useRouter()
    const { pid } = router.query

    const [featured_media, setFeatured_media] = useState(null)

    function fetchImage(){
        if(wordpressPage !== null) {
            fetch(`https://admin.pascalegirardin.art/wp-json/wp/v2/media/${featured_mediaID}`)
            .then((response) => response.json())
            .then(data => {
                setFeatured_media(data)
            })
        }
    }
        useEffect(() => { fetchImage() }, [wordpressPage]);

    return featured_media === null ? <></> :(
        <Layout 
            title={wordpressPage.title.rendered} 
            description={wordpressPage.excerpt.rendered}
            menus={menus}
            pageContext={pageContext}
            >
            <div id="article" className="article">
                <div className="article__wrap">
                    <ProjectHeader
                        title={wordpressPage.title.rendered}
                        subtitle={wordpressPage.acf.subtitle}
                        dates={wordpressPage.acf.dates}
                        place={wordpressPage.acf.place}
                        classMod='single'
                    />
                    <div className="article__main">
                        <div className="project">
                            {featured_media && (
                                <div className="project__thumb">
                                    <ProjectThumb classMod="header">
                                    <ProjectThumbImage
                                        source_url={featured_media.source_url}
                                        size={wordpressPage.acf.size}
                                        align="right"
                                        caption={featured_media.caption.rendered}
                                        title={featured_media.title.rendered}
                                    />
                                    </ProjectThumb>
                                </div>
                            )}
                            <div className="project__content">
                                <div className="project-content">
                                    {
                                        wordpressPage.acf.flexible_content.map((section, index) => 
                                            <PageContent 
                                                element={section} 
                                                wordpressPage={wordpressPage} 
                                                key={ (index + section.acf_fc_layout).toString() } 
                                            />
                                        )
                                    }
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
    const expo = await cherche(`projects?slug=${pid.params.pid}`)
    const wordpressPage = expo[0]
    const featured_mediaID = wordpressPage.featured_media
    const menus = await cherche("menus")
    return {
        props: {wordpressPage, featured_mediaID, menus},
    }
}

export async function getStaticPaths() {

    const projects = await cherche("projects?per_page=100&page=1")
    let paths = []
    projects.map(expo => {
        paths.push(`/projects/${expo.slug}`)
    })
    console.log(paths)
    return {
        paths,
        fallback: false,
    }
}