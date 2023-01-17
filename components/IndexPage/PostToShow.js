import React, { useState } from "react";
import { Row } from "./Row";
import ProjectThumb from "../SingleProject/ProjectThumb";

function PostsToShow ({firstChunk,lastChunk, pageContext, media}) { //  console.log(firstChunk) ; console.log(lastChunk) 

    let [showMore, setShowMore] = useState('none')
    let [hideThis, setHideThis] = useState('block')

    let more = pageContext.locale === 'fr_CA' ? 'PLUS' : 'MORE'

    function ShowMore (){
        return (
            <div className="index__loadmore" style={{display: hideThis }} >
                <button className="loadmore"
                        onClick={() => {
                            setShowMore('block') 
                            setHideThis('none')
                        }}
                    >
                    {more}
                    <br/>
                    ↓
                </button>
            </div>
    )}
    return firstChunk === null || lastChunk === null ? <></> : (
        <>
            <div className="index">
                <ProjectThumb classMod="index">
                    { firstChunk.map( e => {
                        return <Row element={e} key={e.date} pageContext={pageContext} media={media} /> 
                    })}
                </ProjectThumb>
                <ShowMore />
                    <div style={{display: showMore}}>
                    <ProjectThumb classMod="index" >
                        { lastChunk.map( e => {
                            return <Row element={e} key={e.date} pageContext={pageContext} media={media}/> 
                        })}
                    </ProjectThumb>
                </div>
            </div>
        </>
    )
}
export default PostsToShow