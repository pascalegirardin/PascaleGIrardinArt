import React from 'react'

function Logotype ({parent}) {
  return (
      <h1 className={`${parent}__title`}>
        <div className="logotype">
          <a aria-current="page" className="" href="/">Pascale Girardin</a>
        </div>
      </h1>
  )
}
export default Logotype