import * as React from "react"
import Button from "react-bootstrap/Button"

import Layout from "../components/layout"
import Seo from "../components/seo"

const RegistryIndex = ({ data, location }) => {

  return (
    <Layout location={location} title="The registry">
      <Seo title="The registry" />

      <br/>
      <p> The real point of this entire exercise is to spend time with friends
          and family.  So the ideal gift would be the gift of your time.  Take
          us out for a meal.  Show us the local attractions.  Or just let us
          park in your driveway for a few days!  </p>

      <p> That said, I know that some of you are traditionalists and like giving
          gifts.  For you, we have registered with a site called honeyfund.</p>

      <a rel="noreferrer" target="_blank" 
         href="https://honeyfund.com/wedding/CharlaandMattGetHitched">
        <Button>Give us stuff on Honeyfund.com</Button>
      </a>
          honeyfund.com/wedding/CharlaandMattGetHitched
          
    </Layout>
  )
}

export default RegistryIndex
