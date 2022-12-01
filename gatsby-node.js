const _ = require(`lodash`)
const Promise = require(`bluebird`)
const path = require(`path`)
const slash = require(`slash`)
const axios = require('axios');


const { languages } = require('./src/i18n/locales')

//Translations: Array of { locale, path }
const getTranslations = (node, pathPrefix = '/') => {
  const defaultLanguage = languages.find(language => language.isDefault)
  let translations = []

  if (typeof node.polylang_translations !== 'undefined') {
    translations = node.polylang_translations.map(translation => {
      const locale = translation.polylang_current_lang
      const currentLanguage =
        languages.find(language => language.locale === locale) ||
        defaultLanguage
      const path =
        locale === defaultLanguage.locale
          ? `${pathPrefix}${translation.slug}/`
          : `/${currentLanguage.slug}${pathPrefix}${translation.slug}/`

      return {
        locale,
        path,
      }
    })
  }
  return translations
}

const getPath = (node, pathPrefix = '/') => {
  const locale = node.polylang_current_lang
  const defaultLanguage = languages.find(language => language.isDefault)
  const currentLanguage =
    languages.find(language => language.locale === locale) || defaultLanguage

  return locale === defaultLanguage.locale
    ? `${pathPrefix}${node.slug}/`
    : `/${currentLanguage.slug}${pathPrefix}${node.slug}/`
}

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  if (page.path.includes('404')) {
    return Promise.resolve()
  }

  return new Promise(resolve => {

    languages.forEach(({ locale, slug, isDefault }) => {
      const path = isDefault ? `${page.path}` : `/${slug}${page.path}`

      const localePage = {
        ...page,
        originalPath: page.path,
        path,
        context: {
          languages,
          locale,
          routed: true,
          originalPath: page.path,
        },
      }
      createPage(localePage)

      resolve()
    })
    // ==== END PAGES ===
  })
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {

    axios.get(`http://admin.pascalegirardin.art/wp-json/wp/v2/pages`).then(result => {

      if (result.errors) {
        console.log(result.errors)
        reject(result.errors)
      }

      const pageTemplate = path.resolve(`./src/templates/PageTemplate.js`)
      result.data.map((node) => {
        const path = getPath(node)
        const translations = getTranslations(node)

        createPage({
          path,
          component: slash(pageTemplate),
          context: {
            id: node.id,
            languages,
            locale: node.polylang_current_lang,
            translations,
          },
        })
      })
    })

    .then(() => { axios.get(`http://admin.pascalegirardin.art/wp-json/wp/v2/projects?per_page=100&page=1`).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const postTemplate = path.resolve(`./src/templates/ProjectTemplate.js`)

        result.data.map((node) => {
          const path = getPath(node)
          const translations = getTranslations(node)

          createPage({
            path,
            component: slash(postTemplate),
            context: {
              id: node.id,
              languages,
              locale: node.polylang_current_lang,
              translations,
            },
          })
        })
      })
    })

      .then(() => { axios.get(`http://admin.pascalegirardin.art/wp-json/wp/v2/posts`)
        .then(result => {
          if (result.errors) {
            console.log(result.errors)
            reject(result.errors)
          }
          const postTemplate = path.resolve(`./src/templates/NewsTemplate.js`)
        
          result.data.map((node) => {
            const path = getPath(node)
            const translations = getTranslations(node)

            createPage({
              path,
              component: slash(postTemplate),
              context: {
                id: node.id,
                languages,
                locale: node.polylang_current_lang,
                translations,
              },
            })
          })
          resolve()
        })
      })
  })
}