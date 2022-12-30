// -->  https://github.com/gatsbyjs/gatsby-starter-wordpress-blog

module.exports = {
  plugins: [
    require.resolve(`./Rest-To-GraphQL`),
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url:
          process.env.WPGRAPHQL_URL ||
          `https://admin.pascalegirardin.art/wp/graphql`,
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `pascale giradin`,
        short_name: `p`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: './static/favicon-32x32.png',
      },
    },
  ],
}