import Layout from "../components/Layout"

function NotFoundPage () {

  let pageContext =  { locale : 'fr_CA', }

  return (
    <Layout title='404' pageContext={pageContext}> 
      <div className="page-404">
        <h1>404 NOT FOUND</h1>
      </div>
    </Layout>
  )
}
export default NotFoundPage