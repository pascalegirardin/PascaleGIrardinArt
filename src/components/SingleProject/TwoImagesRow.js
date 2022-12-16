import React from 'react'
import useFetch from '../Hooks/useFetch';
import ProjectThumb from './ProjectThumb'
import ProjectThumbImage from './ProjectThumbImage'
import ThumbRow from './ThumbRow'


function TwoImagesRow ({element})  {

  const searchThis = (str) => {
    let x = str.substring(str.lastIndexOf("/") + 1);
    let y = `media?search=${x}`
    return y
  };
  let urlLeft = searchThis(element.left.image)
  let urlRight = searchThis(element.right.image)

  let [left] = useFetch(urlLeft)
  let [right] = useFetch(urlRight)

  return left === null || right === null ? <></>:(
    <div className="project-content__block project-content__block--images">
      <ProjectThumb classMod="content">
        <ThumbRow>
          <ProjectThumbImage
            size={element.left.size}
            align={'left'}
            caption={left[0].caption.rendered}
            title={left[0].title.rendered}
            source_url={left[0].source_url}
            row={false}
          />
          <ProjectThumbImage
            size={element.right.size}
            align={'right'}
            caption={right[0].caption.rendered}
            title={right[0].title.rendered}
            source_url={right[0].source_url}
            row={false}
          />
        </ThumbRow> 
      </ProjectThumb> 
    </div>
  )
}
export default TwoImagesRow


/* import React from 'react'
import useImage from '../Hooks/useImage'
import ProjectThumb from './ProjectThumb'
import ProjectThumbImage from './ProjectThumbImage'
import ThumbRow from './ThumbRow'


function TwoImagesRow ({element})  {

  let [data] = useImage();

  let left, right

  function pic (data, id){  
    let x
    data.allRestMedias.edges.forEach((image) => {
        image.node.source_url === id
        ? x = image.node 
        : void(0)
    })
    console.log(x)
    return x
  }

  left = pic(data, element.left.image)
  right = pic(data, element.right.image)

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
export default TwoImagesRow */