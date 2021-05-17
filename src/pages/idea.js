import * as React from "react"
import { graphql } from "gatsby"

// import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const IdeaPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />

    <p>Matt was scarred as a child and is no longer interested in huge parties where you don’t get to spend time with people.  </p>

    <p>Charla just wants to make everyone she’s ever known
    <span className="strikethrough"> be very uncomfortable </span> share their
    feelings. Or read a poem. </p>

    <p>So we’re turning our wedding on its head. Instead of having everyone
    we love pack their bags and schlep out to California, we’re gonna pack
    <em>our</em> bags (you know Charla will take any excuse to pack her bags…).
    You get to spend more quality time with us. We get to not feel overwhelmed
    by the sheer number of people. And no one has to eat wedding chicken (not
    that the chicken at your wedding was bad. Everyone loved it. Really!). </p>

    <h3>The Plan</h3>
    <p>The ceremony and the documents will happen in July, and in August we hit 
    the road. The western US will happen in late summer / autumn 
    <span className="strikethrough"> 2020 </span> 2021. Then a few months
    snowbirding in the South and we’ll make our way up the East Coast in
    Spring <span className="strikethrough">2021</span> 2022. Early summer we’ll
    cross into Canada and make our way back to the Midwest and end the tour in
    Wisconsin in July <span className="strikethrough">2021</span> 2022! </p>

    <p>Along the way we’re going to stop and see everyone. And see the last of
    the 50 states that are still on the to-do list. And probably take a couple
    of sabbaticals to Hanoi and Bogota. </p>

    <p>We know, it’s a tough life. Just remember, we’re doing it for you. </p>
    </Layout>
  )
}

export default IdeaPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
