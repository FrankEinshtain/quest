require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    name: `My First Typescript Quest`,
    tagline: `Gatsby + SASS + not yet Typescript + ME! = 💪`,
    title: 'My Title',
    description: 'My description',
    author: 'ME',
  },
  plugins: [
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-theme-auth0',
      options: {
        domain: process.env.GATSBY_AUTH0_DOMAIN,
        clientID: process.env.GATSBY_AUTH0_CLIENT_ID,
        redirectUri: process.env.GATSBY_AUTH0_CALLBACK_URL,
        // audience: process.env.AUTH0_AUDIENCE, // Optional
        // responseType: process.env.AUTH0_RESPONSE_TYPE, // Optional
        // scope: process.env.AUTH0_SCOPE, // Optional
        // callbackPath: "/auth/callback", // Optional
      },
    },
    // 'gatsby-plugin-scss-typescript',
    // `gatsby-plugin-typescript`,
    // `gatsby-plugin-tslint`,
  ],
}
