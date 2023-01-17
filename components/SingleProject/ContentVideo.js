import React, { Component } from 'react'
import Vimeo from '@u-wave/react-vimeo'

function ContentVideo({ vimeoUrl }){
  return (
    <div className="project-content__block project-content__block--video">
      <div className="video">
        <Vimeo video={vimeoUrl} />
      </div>
    </div>
  )
}
export default ContentVideo
