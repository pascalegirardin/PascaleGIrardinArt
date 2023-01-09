import React from "react";
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

const Head = ({ description, lang, meta, title }) => {

  const metaDescription = description || 'Trop beau'
  const defaultTitle = 'Pascale Girardin'
  let titre = title ? title : defaultTitle
  return (
    <>
      <title>{titre}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={titre} />
      <meta property="og:description" content={description} />
    </>
    
  )
}
export default Head
