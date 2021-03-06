import * as React from "react"

// import Bio from "../components/bio"
import Layout from "../components/layout"

const IdeaPage = ({ data, location }) => {

  return (
    <Layout location={location} title="The idea">

    <p>Matt was scarred as a child and is no longer interested in huge parties
    where you don’t get to spend time with people.  </p>

    <p>Charla just always wants to go visit eveyone she's ever known for long
    enough to ask eighty questions and tell far too long a story. </p>

    <p>So we’re turning our wedding on its head: instead of having everyone
    we love pack their bags and schlep out to California for a whirlwind
    weekend, we’re gonna pack <em>our</em> bags and roll your way.
    You get to spend more quality time with us. We get to not feel overwhelmed
    by the sheer number of people. And no one has to deal with the TSA.</p>

    <h4>The extra cute part</h4>
    <p>Awkwardly soon into dating we realized that we both had this same
       idea.  And now here we are!</p>


    <h3>The Plan</h3>
    <p>The official official and the signing of documents will happen in July
    with our immediate family, as well some celebrating in SoCal. In August
    we hit the road. The western US will happen in late summer / autumn 
    <span className="strikethrough"> 2020 </span> 2021. After a few months
    snowbirding in the South and we’ll make our way up the East Coast in
    Spring <span className="strikethrough">2021</span> 2022. Early summer we’ll
    cross into Canada and make our way back to the Midwest and end the tour in
    Wisconsin in Summer <span className="strikethrough">2021</span> 2022! </p>

    <p>Along the way we want to stop and see you, hear all about how you are,
    and revel in the fact that we are not on Zoom.   And see the last of
    the 50 states that are still on our to-do list. And if we are extra lucky, 
    we'll take a couple of sabbaticals to Hanoi and Bogota. </p>

    <p>We know, it’s a tough life. Just remember, we’re doing it for you. </p>
    </Layout>
  )
}

export default IdeaPage
