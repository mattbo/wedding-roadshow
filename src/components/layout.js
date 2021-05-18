import * as React from "react"
import { Link } from "gatsby"
import logo from "../images/MC_logo.svg"
import Login from './login'


const Layout = ({ location, title, children }) => {
  // const [showModal, setShowModal] = React.useState(false);
  let showModal = false;
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  const bgImage = isRootPath ? 'parallax-dot' : 'parallax';

  let header = (
    <h1 className="main-heading">
      <Link to="/">{title}</Link>
    </h1>
  )

  return (
    <div>
      <div className={bgImage} >
        <header className="hero-header">{header}</header>
      </div>

      <ul className="navbar">
        <li className="h3">
          <Link to='/idea' itemProp="url">The idea</Link></li>
        <li className="h3">
          <Link to='/map' itemProp="url">The map</Link></li>
        <li className="h3">
          <Link to='/playlist' itemProp="url">The playlist</Link></li>
        <li className="h3">
          <Link to='/registry' itemProp="url">The registry</Link></li>
        <li className="h3">
          <Link to='/blog_top' itemProp="url">The blog</Link></li>
      </ul>
      <div className="global-wrapper" data-is-root-path={isRootPath}>
        <main>{children}</main>
        <footer>
         <p>
           <img width="60px" src={logo} alt="Matt and Charla logo"/> &nbsp;
          Designed by <strong>Charla</strong>; built by <strong>Matt</strong>
         </p>
          © {new Date().getFullYear()}, Built with
          {` `} <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer>
      </div>
      <Login />
    </div>
  )
}

export default Layout
