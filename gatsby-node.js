exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  console.log('onCreatePage page :>> ', page)
  if (page.path.match(/^\/thegame/)) {
    page.matchPath = '/thegame/*'

    createPage(page)
  }
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  console.log('onCreateWebpackConfig stage :>> ', stage)
  // if (stage === 'build-html' || stage === 'build') {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /auth0-js/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
