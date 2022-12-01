import React , { useEffect, useState } from "react"
import { withIntl } from '../i18n'
import PageContent from "../components/PageContent/PageContent";
import Layout from "../components/Layout";
import ProjectThumb from "../components/SingleProject/ProjectThumb";
import ProjectHeader from "../components/SingleProject/ProjectHeader";
import ProjectThumbImage from "../components/SingleProject/ProjectThumbImage";

function ProjectTemplate ({pageContext, location}){                                         //console.log(pageContext)
    const [ wordpressPage, setWordpressPage] = useState(null)
    const [featured_media , setFeatured_media] = useState(null)

    function fetchPage(){
        fetch(`http://admin.pascalegirardin.art/wp-json/wp/v2/projects/${pageContext.id}`)
        .then((response) => response.json())
        .then(data => {                                                                     //console.log(data)
            setWordpressPage(data); 
        })
        .catch((error) => console.log('tabarouette'))
        
    }
        useEffect(() => { fetchPage() }, []); 

    function fetchImage(){
        if(wordpressPage !== null) {
            fetch(`http://admin.pascalegirardin.art/wp-json/wp/v2/media/${wordpressPage.featured_media}`)
            .then((response) => response.json())
            .then(data => {
                console.log('--------------')
                console.log(data)
                setFeatured_media(data) 
            })
        }
    }
        useEffect(() => { fetchImage() }, [wordpressPage]);
    
    return wordpressPage === null ? <></> :(
        <Layout title={wordpressPage.title.rendered} description={wordpressPage.excerpt.rendered} pageContext={pageContext}>
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
export default withIntl(ProjectTemplate)