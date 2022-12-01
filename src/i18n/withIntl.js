import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { IntlProvider, addLocaleData } from 'react-intl'
import { localeData } from './locales'

addLocaleData(localeData)

export const get_language = (locale) => {
  if (typeof locale === 'undefined') {
    console.log('get_language: locale undefined.')
    return 'fr'
  }

  const dash_index = locale.indexOf('_')

  if (dash_index >= 0) {
    return locale.substring(0, dash_index)
  }

  return locale
}

export default ComposedComponent => {
  class withIntl extends Component {
    static childContextTypes = {
      language: PropTypes.object,
    }

    constructor(props) {
      super(props)
      const { pageContext } = props
      const { locale, languages, originalPath } = pageContext

      this.state = {
        language: {
          locale,
          languages,
          originalPath,
        },
      }
    }

    getChildContext() {
      const { language } = this.state
      return {
        language,
      }
    }

    render() {
      const { language } = this.state
      const locale = language.locale || 'fr_CA'
      const messages = require(`./locales/${locale}.js`) // eslint-disable-line

      return <IntlProvider locale={get_language(locale)} messages={messages}>
          <ComposedComponent {...this.props} />
        </IntlProvider>
    }
  }
  return withIntl
}
