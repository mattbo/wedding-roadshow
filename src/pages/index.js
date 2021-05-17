import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const MainPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />

      <h3>AND NOW FOR SOMETHING COMPLETELY DIFFERENT…</h3>
      <p> We’re sure that it comes as a surprise to no one, but we’re upending ritual and tradition and doing our own thing. </p>

      <p>Go read about <Link to='idea'>The Idea</Link>. Then take a look at <Link to="map">The Map</Link>. Don’t forget to add some tracks to our <Link to="playlist">Playlist</Link>.</p>

      <p>Global pandemics notwithstanding, we hope to see each and every one of you in your hometown real soon!</p>

      <Bio />
    </Layout>
  )
}

export default MainPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
