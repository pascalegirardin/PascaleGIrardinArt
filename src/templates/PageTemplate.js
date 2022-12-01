import React, { useState } from "react"
import { withIntl } from '../i18n'
import Link from 'gatsby-link'
import PageContent from "../components/PageContent/PageContent"
import Layout from "../components/layout"
import useFetch from "../components/Hooks/useFetch"

function PageTemplate ({pageContext, location}){

  const isBrowser = () => typeof window !== "undefined"

  const findHash = () => {
    let x
    if (isBrowser()) {
      const hash = window.location.hash
      x = window.location.hash === ''? 0 : window.location.hash.substring(1)
    }
    return x
  }

  const [hash, setHash] = useState(() => findHash());

  if (isBrowser()) {
    window.onhashchange = () => {
      setHash(window.location.hash.substring(1))
    }
  }

  const [ wordpressPage ] = useFetch(`pages/${pageContext.id}`)

  return wordpressPage === null ? <></> : (
      <Layout title={wordpressPage.acf.sections[hash].title} description={wordpressPage.acf.sections[hash].excerpt} pageContext={pageContext} >
        <nav className ="inline-nav">
          <div className ="inline-nav__title">
            <span
              dangerouslySetInnerHTML={{ __html: wordpressPage.title.rendered }}    // section.title
            />
          </div>
          <ul className="inline-nav__items">
          {
            wordpressPage.acf.sections.map((section, index) => (
                <li key={`${location.pathname}ok${index}`} className="inline-nav__item">
                  <Link
                      to={`${location.pathname}#${index}`} replace>
                    <span
                      key={`${location.pathname}s${index}`}
                      className={index == hash ? 'active' : ''}
                      onClick={() => setHash(index)}
                      dangerouslySetInnerHTML={{ __html: section.title }}    // section.title
                    />
                  </Link>
                </li>
            ))
          }
          </ul>
        </nav>
            {
              wordpressPage.acf.sections.map((section, index) => {
                return index == hash 
                  ? section.flexible_content.map(element =>
                    <PageContent 
                      element={element} 
                      wordpressPage={wordpressPage} 
                      key={ (index + element.acf_fc_layout).toString() } 
                    />
                  ): null
              })
            }
      </Layout>
  )
}
export default withIntl(PageTemplate)