import React from "react";
import TextContent from './TextContent'
import OneImageRow from './OneImageRow'
import TwoimagesRow from '../SingleProject/TwoImagesRow'
import ContentVideo from '../SingleProject/ContentVideo'
import ContentSlider from '../SingleProject/ContentSlider'

function PageContent ({element , wordpressPage}) {

    if (element.acf_fc_layout === 'text'){
        return(
            <div className="project-content project-content--page">
                <TextContent text={element.text_content}/>
            </div>
        )
    }
    else if(element.acf_fc_layout === 'one_image_row'){
        return <OneImageRow element={element} wordpressPage={wordpressPage}/>
    } 
    else if (element.acf_fc_layout === 'two_images_row') {
        console.log(element)
        return <TwoimagesRow element={element} />
    }
    else if (element.acf_fc_layout === 'video') {
            return <ContentVideo vimeoUrl={element.vimeo_url} />
    }
    else if (element.acf_fc_layout === 'slider') {
        return (
            <ContentSlider images={element.images} />
        )
    }
    else {
        return <></>
    }
}
export default PageContent