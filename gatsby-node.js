const _ = require(`lodash`)
const Promise = require(`bluebird`)
const path = require(`path`)
const slash = require(`slash`)
const axios = require('axios');

// Static querries 
const cherche = async (url) => {
  const things = await axios.get(`https://admin.pascalegirardin.art/wp-json/wp/v2/${url}`)
  return things.data
}
async function getMediaChunk(x) {
  try {
      const response = await axios.get(`https://admin.pascalegirardin.art/wp-json/wp/v2/media?per_page=50&page=${x}`);
      return response
  } catch (error) {
      if (error.response) {
          let x = [{data: 'gardes la peche'}]
          return x
      }
  }
}
async function getMedia(){
  let x = 1
  let xo = 1
  let y = []
  let z = await getMediaChunk(x)
  while (z.data !== undefined){
      y = y.concat(z.data)
      x++
      z = await getMediaChunk(x)
  }
  return y
}
//

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

exports.onCreatePage =  async ({ page, actions }) => {
  const { createPage, deletePage } = actions

  let posts = await cherche('posts')
  let projects = await cherche('projects?per_page=100&page=1')
  let medias = await getMedia()

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
            posts:posts,
            projects:projects,
            medias:medias,
          },
        }
        createPage(localePage)
    })
}

exports.createPages =  async ({ graphql, actions }) => {
  
  function Create(node, template){
    const path = getPath(node)
      const translations = getTranslations(node)
      createPage({
        path,
        component: slash(template),
        context: {
          id: node.id,
          languages,
          locale: node.polylang_current_lang,
          translations,
        },
      })
  }

  const { createPage } = actions

  let pages = await cherche('pages')
  let projects = await cherche('projects?per_page=100&page=1')
  let posts = await cherche('posts')

  let pageTemplate = path.resolve(`./src/templates/PageTemplate.js`)
  let projectTemplate = path.resolve(`./src/templates/ProjectTemplate.js`)
  let postTemplate = path.resolve(`./src/templates/NewsTemplate.js`)

  pages.map((node) => { Create(node, pageTemplate) })
  projects.map((node) => { Create(node, projectTemplate) })
  posts.map((node) => { Create(node, postTemplate) })
}