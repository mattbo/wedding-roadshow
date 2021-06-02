import * as React from "react"
import Button from "react-bootstrap/Button"

import Layout from "../components/layout"
import Seo from "../components/seo"

const RegistryIndex = ({ data, location }) => {

  return (
    <Layout location={location} title="The registry">
      <Seo title="The registry" />

      <br/>
      <p> Our biggest wish on this wedding-road-trip-adventure is to spend time
          with friends and family.  So the ideal gift would be the gift of your
          time.  Sit with us on the porch or in the park. Show us your favorite
          local spots.  Or just let us park in your driveway and be in your hair          for a few days!  </p>

      <p> For friends and family who have been asking, though,
          we have also registered with a site called honeyfund.</p>

      <a rel="noreferrer" target="_blank" 
         href="https://honeyfund.com/wedding/CharlaandMattGetHitched">
        <Button>Honeyfund.com</Button>
      </a>
          
    </Layout>
  )
}

export default RegistryIndex
