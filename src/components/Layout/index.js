import React from "react";
import Head from "./Head.js"
import Header from "./Header"
import Footer from './Footer';

const Layout = ({ title, children, pageContext, description }) => {

  return (
    <>
      <Head title={title} description={description} />
      <Header pageContext={pageContext}/>
        <main>
          {children}
        </main>
      <Footer pageContext={pageContext}/>
    </>
  )
}
export default Layout
