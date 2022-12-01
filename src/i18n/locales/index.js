/* eslint-disable global-require */

const localeData = [
  ...require('react-intl/locale-data/en'),
  ...require('react-intl/locale-data/fr'),
]

module.exports = {
  localeData,
  languages: [
    {
      locale: 'fr_CA',
      slug: 'fr',
      text: 'Fr',
      isDefault: true,
    },
    {
      locale: 'en_CA',
      slug: 'en',
      text: 'En',
    },
  ],
}
