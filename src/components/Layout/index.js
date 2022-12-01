import React from "react";
import Seo from "./seo.js"
import Header from "./Header"
import Footer from './Footer';

const Layout = ({ title, children, pageContext, description }) => {

  return (
    <>
      <Seo title={title} description={description} />
      <Header pageContext={pageContext}/>
        <main>
          {children}
        </main>
      <Footer pageContext={pageContext}/>
    </>
  )
}
export default Layout
