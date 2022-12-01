import React, { PureComponent } from 'react'
import { withPrefix } from 'gatsby-link'
import browserLang from 'browser-lang'
import { languages } from './index'

class Redirect extends PureComponent {
  constructor(props) {
    super(props)

    const langKeys = languages.map(language => language.slug)
    const { pathname } = props.location

    // Skip build, Browsers only
    if (typeof window !== 'undefined') {
      const detected =
        window.localStorage.getItem('language') ||
        browserLang({
          languages: langKeys,
          fallback: 'fr',
        })

      const lang = languages.find(language => language.slug === detected)
      const pathPrefix = lang.isDefault ? '/' : `/${slug}/`
      const newUrl = withPrefix(`${pathPrefix}${pathname}`)

      window.localStorage.setItem('language', detected)
      window.location.replace(newUrl)

      console.log('browserLang', browserLang({
        languages: langKeys,
        fallback: 'fr',
      }))
      console.log('newUrl', newUrl)
    }
  }

  render() {
    return <div />
  }
}

export default Redirect
