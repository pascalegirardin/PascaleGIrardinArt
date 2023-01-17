import Head from "./Head/index.js"
import Header from "./Header"
import Footer from './Footer';

const Layout = ({ title, children, pageContext, description, menus }) => {

  return (
    <>
      <Head 
        title={title} description={description} />
      <Header 
        pageContext={pageContext} menus={menus}/> 
        <main>
          {children}
        </main>
      <Footer 
        pageContext={pageContext} menus={menus}/>
    </>
  )
}
export default Layout
