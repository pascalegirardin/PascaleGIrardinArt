import React from "react"

function ThumbRow({ children, align }) {
    let classname = 'project-thumb__row'
  
    if (align) {
      classname = classname.concat(` project-thumb__row--${align}`)
    }
  
    return <div className={classname}>{children}</div>
  }
export default ThumbRow