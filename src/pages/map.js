import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import MapImg from "../images/furkot.png"

const MapIndex = ({ data, location }) => {

  return (
    <Layout location={location} title="The map">
      <Seo title="The map" />

      <img width="100%" src={MapImg} alt="map with our route" />
      <br/>
      <p> Here's a rough overview of the plan: </p>
      <ul>
          <li> Leave San Diego the last week of August, 2021 </li>
          <li> Head north along the coast with definite stops in 
            <ul>
             <li> San Francisco </li>
             <li> Portland </li>
             <li> Seattle </li>
            </ul></li>
          <li> Hang a right, cross the mountains and head south on the eastern
          side of the Rocky Mountains.  Definite stops in
            <ul>
             <li> Missoula </li>
             <li> Jackson </li>
             <li> Denver </li>
            </ul></li>
          <li> Somewhere in New Mexico, bang a left and shoot across Texas and
          the South.  Definite stops in 
            <ul>
             <li> Austin </li>
             <li> New Orleans </li>
            </ul></li>
          <li> Find somewhere warm for the cold bits of winter.  Head north
          along the eastern seaboard in Spring 2022 Definite stops in 
            <ul>
             <li> Spartanburg </li>
             <li> Savannah </li>
             <li> Charlotte </li>
             <li> DC </li>
             <li> New York </li>
             <li> Boston </li>
             <li> Portland, Maine </li>
            </ul></li>
          <li> Cross the border into Canada and head back west.  Cross back into
          the US and enter the home stretch back to Wisconsin.  Definite stops
          in 
            <ul>
             <li> Toronto </li>
             <li> Montreal </li>
             <li> Minneapolis </li>
             <li> Milwaukee </li>
             <li> Watertown, WI </li>
            </ul></li>
          </ul>

          <p> After that, in mid/late summer 2022, we re-evaluate.  Back to San
          Diego?  Move to Europe or South America for a minute?  Maybe put more
          gas in the van and keep going??  Stay tuned to find out! </p>
    </Layout>
  )
}

export default MapIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
