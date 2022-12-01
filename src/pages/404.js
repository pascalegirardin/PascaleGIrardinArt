import React from "react"
import Layout from "../components/Layout"

const NotFoundPage = ({ pageContext, data, location }) => {
  return (
    <Layout title='404' pageContext={pageContext}> 
      <div className="page-404">
        <h1>404 NOT FOUND</h1>
      </div>
    </Layout>
  )
}
export default NotFoundPage