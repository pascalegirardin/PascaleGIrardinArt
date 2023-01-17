import Head from "next/head";

const Seo = ({ description, title }) => {

  const metaDescription = description || 'Trop beau'
  const defaultTitle = 'Pascale Girardin'
  let titre = title ? title : defaultTitle
  return (
    <Head>
      <title>{titre}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={titre} />
      <meta property="og:description" content={description} />
      <link rel="icon" href="/icon-144x144.png"></link>
    </Head>
    
  )
}
export default Seo