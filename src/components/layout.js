import * as React from "react"
import { Link } from "gatsby"


const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header = (
    <h1 className="main-heading">
      <Link to="/">{title}</Link>
    </h1>
  )

  return (
    <div id="outermost">
    <div className='parallax' >
      <header className="hero-header">{header}</header>
    </div>

      <ul className="navbar">
        <li className="h3">
          <Link to='/idea' itemProp="url">The Idea</Link></li>
        <li className="h3">
          <Link to='/map' itemProp="url">The Map</Link></li>
        <li className="h3">
          <Link to='/playlist' itemProp="url">The Playlist</Link></li>
        <li className="h3">
          <Link to='/blog_top' itemProp="url">The Blog</Link></li>
      </ul>
      <div className="global-wrapper" data-is-root-path={isRootPath}>
        <main>{children}</main>
        <footer>
         <p>
           Written by <strong>Charla</strong>; built by <strong>Matt</strong>
         </p>
          © {new Date().getFullYear()}, Built with
          {` `} <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer>
      </div>
    </div>
  )
}

export default Layout
