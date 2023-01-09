import React from 'react'
import PropTypes from 'prop-types'
import { Link } from "gatsby"
import { languages } from './locales'

const I18nLink = ({ to, children, locale, ...rest }) => {
  if (!locale) {
    return (
      <Link to={to} {...rest}>
        {children}
      </Link>
    )
  }

  const lang =
    languages.find(language => language.locale === locale) ||
    languages.find(language => language.isDefault)
  const pathPrefix = lang.isDefault ? '' : `${lang.slug}`
  const toWithLang =
    pathPrefix && to.substring(0, 3) !== `/${pathPrefix}`
      ? `/${pathPrefix}${to}`
      : `${to}`

  // console.log('link', { locale, lang, pathPrefix, toWithLang })

  return (
    <Link to={toWithLang} {...rest}>
      {children}
    </Link>
  )
}

I18nLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

// I18nLink.contextTypes = {
//   language: PropTypes.object,
// }

export default I18nLink
