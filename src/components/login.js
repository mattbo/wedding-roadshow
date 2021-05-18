import React from "react"
import { navigate } from "gatsby"
import { Modal, Form, Button, Row, Col} from "react-bootstrap";
import { handleLogin, isLoggedIn } from "../services/auth"

class Login extends React.Component {
  state = {
    password: ``,
  }

  handleUpdate = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    handleLogin(this.state)
  }

  render() {
    let showModal = false;
    if ( !isLoggedIn() ) { 
      showModal = true;
    }
    return (
      <Modal show={showModal} size="lg" 
        backdrop="static" centered keyboard="false">
       <Modal.Header>
         <h3> Password required! </h3>
       </Modal.Header>
       <Modal.Body>
        <p> Yeah, it's annoying, but we can't have just anyone adding to our
            playlist! </p>
        <p> The password is somewhere on the invitation (paper or email) </p>
        <p>... keep looking...  </p>
        <p>... I have faith in you... </p>
        <Form
          method="post"
          onSubmit={event => {
            this.handleSubmit(event)
            navigate(`/`)
          }}
        >
            <Form.Control
              size="lg"
              type="password"
              name="password"
              placeholder="password"
              onChange={this.handleUpdate}
            />
          <br/>
            <Button size="lg" type="submit" block variant="primary">
                Log In
            </Button>
          <Row><Col md={{ span: 4, offset: 4 }}>
          </Col></Row>
        </Form>
       </Modal.Body>
     </Modal>
    )
  }
}

export default Login
