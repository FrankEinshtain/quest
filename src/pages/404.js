import * as React from 'react'
import { graphql, Link, PageProps } from 'gatsby'
// import * as styles from '../scss/Index.module.scss'

// import Layout from "../components/layout"
// import Seo from "../components/seo"

type DataProps = {
  site: {
    buildTime: string
    siteMetadata: {
      name: string
      tagline: string
    }
  }
}

const NotFoundPage: React.FC<PageProps<DataProps>> = ({ data, path }) => {
  const { buildTime } = data.site
  const { name, tagline } = data.site.siteMetadata
  return (
    <div>
      <h1>Page Not Found</h1>
      <h2>{name}</h2>
      <h3>{tagline}</h3>
      <p>{buildTime}</p>
      <p>{path}</p>
    </div>
  )
}

export default NotFoundPage

export const query = graphql`
  {
    site {
      buildTime(formatString: "YYYY-MM-DD hh:mm a z")
      siteMetadata {
        name
        tagline
      }
    }
  }
`
