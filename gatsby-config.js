// require('dotenv').config({
//   path: `.env.${process.env.NODE_ENV}`,
// })
require('dotenv').config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    name: `My gatsby-config Name`,
    tagline: `Gatsby tagline 💪`,
    title: 'My gatsby-config Title',
    description: 'My gatsby-config description',
    author: 'gatsby-config ME',
  },
  plugins: [
    // {
    //   resolve: `gatsby-plugin-sass`,
    //   options: {
    //     implementation: require('node-sass'),
    //   },
    // },
    'gatsby-plugin-sass',
    // 'gatsby-plugin-netlify',
    //
    // "gatsby-theme-auth0": "^1.1.1",
    // {
    //   resolve: 'gatsby-theme-auth0',
    //   options: {
    //     domain: process.env.GATSBY_AUTH0_DOMAIN,
    //     clientID: process.env.GATSBY_AUTH0_CLIENT_ID,
    //     redirectUri: process.env.GATSBY_AUTH0_CALLBACK_URL,
    //
    // callbackPath: '/callback',
    // audience: process.env.AUTH0_AUDIENCE, // Optional
    // responseType: process.env.AUTH0_RESPONSE_TYPE, // Optional
    // scope: process.env.AUTH0_SCOPE, // Optional
    //
    //   },
    // },

    // 'gatsby-plugin-scss-typescript',
    // `gatsby-plugin-typescript`,
    // `gatsby-plugin-tslint`,
  ],
}
