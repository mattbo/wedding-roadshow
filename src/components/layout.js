import * as React from "react";
import { Link } from "gatsby";
import { Container, Row, Col } from "react-bootstrap";
import { Parallax } from 'react-parallax';
import logo from "../images/MC_logo.svg";
import landscape from "../images/landscapeNoDot.jpg";
import dotSvg from "../images/roving.svg";
import Login from './login';


const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  const getParallax = () => { 
      if (isRootPath) { return (
          <Parallax blur={0} bgImage={landscape} bgImageAlt="wide open road"
                             strength={100}>
              <div className="hero-placeholder">
                  <img className="hero-img" alt="it's a roving wedding!" src={dotSvg} />
              </div>
          </Parallax>
      ); }
      return (
          <Parallax blur={0} bgImage={landscape} bgImageAlt="wide open road"
                             strength={100}>
              <div className="hero-placeholder">
                <header className="hero-header">{title}</header>
              </div>
          </Parallax> );
  }

  return (
    <div>
      {getParallax()}
      <Container>
      <Row className="navbar">
        <Col xs={12} md={2} className="h3">
          <Link to='/' itemProp="url">Idea</Link></Col>
        <Col xs={12} md={2} className="h3">
          <Link to='/map' itemProp="url">Map</Link></Col>
        <Col xs={12} md={2} className="h3">
          <Link to='/playlist' itemProp="url">Playlist</Link></Col>
        <Col xs={12} md={2} className="h3">
          <Link to='/photos' itemProp="url">Photos</Link></Col>
        <Col xs={12} md={2} className="h3">
          <Link to='/registry' itemProp="url">Registry</Link></Col>
      </Row><Row>
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
      </Row></Container>
      <Login />
    </div>
  )
}

export default Layout
