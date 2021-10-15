require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})
console.log('gatsby-config process.env.GATSBY_AUTH0_DOMAIN :>> ', process.env.GATSBY_AUTH0_DOMAIN)
module.exports = {
  siteMetadata: {
    name: `My First Typescript Quest`,
    tagline: `Gatsby tagline 💪`,
    title: 'My gatsby-config Title',
    description: 'My gatsby-config description',
    author: 'gatsby-config ME',
  },
  plugins: [
    'gatsby-plugin-sass',
    // 'gatsby-plugin-netlify',
    {
      resolve: 'gatsby-theme-auth0',
      options: {
        domain: process.env.GATSBY_AUTH0_DOMAIN,
        // domain: process.env.GATSBY_AUTH0_APP_ID,
        clientID: process.env.GATSBY_AUTH0_CLIENT_ID,
        redirectUri: process.env.GATSBY_AUTH0_CALLBACK_URL,
        // audience: process.env.AUTH0_AUDIENCE, // Optional
        // responseType: process.env.AUTH0_RESPONSE_TYPE, // Optional
        // scope: process.env.AUTH0_SCOPE, // Optional
        // callbackPath: "/auth/callback", // Optional
      },
    },
    {
      resolve: `gatsby-plugin-facebook-sdk`,
      options: {
        appId: process.env.GATSBY_FACEBOOK_APP_ID,
        version: 'v2.7',
      },
    },
    // 'gatsby-plugin-scss-typescript',
    // `gatsby-plugin-typescript`,
    // `gatsby-plugin-tslint`,
  ],
}
