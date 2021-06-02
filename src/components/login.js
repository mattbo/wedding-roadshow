import React from "react"
import { navigate } from "gatsby"
import { Modal, Form, Button, Collapse, Alert} from "react-bootstrap";
import { handleLogin, isLoggedIn } from "../services/auth"

class Login extends React.Component {
  state = {
    password: ``,
    showAlert: false
  }

  constructor(props) {
      super(props);
      this.passwdRef = React.createRef();
  }

  handleUpdate = event => {
    this.setState({
      [event.target.name]: event.target.value,
      showAlert: false
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    if (!handleLogin(this.state)) {
        this.passwdRef.current.value = '';
        this.setState({showAlert: true});
    }
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
        <p> The password is somewhere on the announcement (paper or email) </p>
        <p>... keep looking...  </p>
        <p>... I have faith in you... </p>
        <Collapse appear={false} in={this.state.showAlert} timeout={1000}>
             <Alert show={this.state.showAlert} key="danger" variant='danger'>
                Nope, that ain't right.  Try again...
             </Alert>
        </Collapse>
        <Form
          method="post"
          onSubmit={event => {
            this.handleSubmit(event)
            navigate(`/`)
          }}
        >
            <Form.Control
              ref={this.passwdRef}
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
        </Form>
       </Modal.Body>
     </Modal>
    )
  }
}

export default Login
