import React from 'react'
import useImage from '../Hooks/useImage'
import ProjectThumb from './ProjectThumb'
import ProjectThumbImage from './ProjectThumbImage'
import ThumbRow from './ThumbRow'


function TwoImagesRow ({element})  {

  let [left] = useImage(element.left.image);
  let [right] = useImage(element.right.image);


  return left === null || right === null ? <></>:(
    <div className="project-content__block project-content__block--images">
      <ProjectThumb classMod="content">
        <ThumbRow>
          <ProjectThumbImage
            size={element.left.size}
            align={'left'}
            caption={left.caption}
            title={left.title}
            source_url={left.source_url}
            row={false}
          />
          <ProjectThumbImage
            size={element.right.size}
            align={'right'}
            caption={right.caption}
            title={right.title}
            source_url={right.source_url}
            row={false}
          />
        </ThumbRow> 
      </ProjectThumb> 
    </div>
  )
}
export default TwoImagesRow