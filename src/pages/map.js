import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import MapImg from "../images/furkot.png"
import under_construction from "../images/underconstruction.gif"
import MyMap from "../components/myMap"

const MapIndex = ({ data, location }) => {

  return (
    <Layout location={location} title="The map">
      <Seo title="The map" />

      <p>Yep, there's something for you to do here too.</p>
      <p>That blue zig-zag on the map below?  That's our plan so far.  The form
          right below it?  That's where you tell us about that one amazing stop
          you think might just be on our way.  Suggest your favorite sandwich in
          your old neighborhood.  Send us on your favorite trail in ____.
          Direct us to that concert venue we have to make sure stays afloat.
          Let us in on the best ____ in ____.  Don't forget ice cream. </p>

          { /* <MyMap /> */ }
      <img width="100%" src={MapImg} alt="map with our route" />
      <br/>

      <img src={under_construction} alt="under construction" />
      <h4> Map form is still in development... check back soon! </h4>
      <img src={under_construction} alt="under construction" />
          
      <p> Here's a rough overview of the itinerary: </p>
      <ul>
          <li> Leave San Diego mid-August, 2021 </li>
          <li> Head north along the coast with stops in 
            <ul>
             <li> San Francisco </li>
             <li> Portland </li>
             <li> Seattle </li>
            </ul></li>
          <li> Hang a right, cross the mountains and head south on the eastern
          side of the Rocky Mountains with stops in
            <ul>
             <li> Missoula </li>
             <li> Jackson </li>
             <li> Fort Collins </li>
            </ul></li>
          <li> Somewhere in New Mexico, bang a left and shoot across Texas and
          the South with stops in 
            <ul>
             <li> Austin </li>
             <li> New Orleans </li>
            </ul></li>
          <li> Find somewhere warm for the cold bits of winter.  Head north
          along the eastern seaboard in Spring 2022 with stops in 
            <ul>
             <li> Savannah </li>
             <li> Spartanburg </li>
             <li> Charlotte </li>
             <li> DC </li>
             <li> New York </li>
             <li> Boston </li>
             <li> Portland, Maine </li>
            </ul></li>
          <li> Cross the border into Canada and head back west.  Cross back into
          the US and enter the home stretch back to Wisconsin with stops
          in 
            <ul>
             <li> Quebec City </li>
             <li> Montreal </li>
             <li> Madeline Island </li>
             <li> Minneapolis </li>
             <li> Chicago </li>
             <li> Watertown, WI </li>
            </ul></li>
          </ul>

          <p> After that, in mid/late summer 2022, we re-evaluate.  Back to San
          Diego?  Cross the pond?  Maybe put more
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
