import * as React from "react"

import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Collapse from "react-bootstrap/Collapse"
import Alert from "react-bootstrap/Alert"
import Layout from "../components/layout"
import Seo from "../components/seo"
import {getGPhotos} from '../components/api';

const albums = {
   wedding: "ACBVj4XmZEW-2Pl704uDw4Rp-V6oHcwWXXdLACc7GjvSVexaYrxHG1Yrtwog6i3itjx9MDQd8jSc",
   old:  "ACBVj4WnMtckBVj-QOO5TaY5YiL-_MtFFxx89HPVjxkDqAsZ43I5h83mH--UWaup6zliRi9KC-dc",
   road: "ACBVj4VXaCj1aYRTkrNDKRx2Ixc-Mth1VS1n0juBY1clCbZk7U8PK_PPXIYGk_Mj3tqKyPvLSSHj"
}

const galleries = {
    old: 'https://photos.app.goo.gl/cfzqvhYyRZJqDVwAA',
    wedding: 'https://photos.app.goo.gl/CScuJ7N5V9YAXYcQ9',
    road: 'https://photos.app.goo.gl/acoC7LoocWrjYtza7'
}

const Photos = ({ data, location }) => {

  const noteRef = React.useRef(null);
  const nameRef = React.useRef(null);
  const personRef = React.useRef(null);
  const albumRef = React.useRef(null);
  const [photo, setPhoto] = React.useState(null);
  const [filename, setFilename] = React.useState("Find a photo");
  const [showAlert, setShowAlert] = React.useState(false);
  const alertRef = React.useRef(null);

// this is a request instance, so we can just call .then()
// to kick off the request.

  const handleFile = (evt) => { 
      const file = evt.target.files[0];
      setFilename(file.name);
      setPhoto(file);
  }

  const upload = (evt) => {
      if (typeof(window) === undefined) { return null; }

      const description = `${personRef.current.value} ` +
        `says: ${noteRef.current.value}`;
      const upload_url = 'https://photoslibrary.googleapis.com/v1/uploads';
      const media_url =
          'https://photoslibrary.googleapis.com/v1/mediaItems:batchCreate';
      
      // Get the access token
      getGPhotos().then(token => {
          fetch(upload_url, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/octet-stream',
                  'X-Goog-Upload-File-Name': nameRef.current.value,
                  'X-Goog-Upload-Protocol': "raw",
                  Authorization: `Bearer ${token}`
              },
              mode: 'cors',
              body: photo
            }).then((resp, err) => { 
                console.log("Got response from google");
                console.log(resp);
                return resp.text();
            }).then( imgToken => {
                // val is a photo ID
                fetch(media_url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    mode: 'cors',
                    body: JSON.stringify({
                        "albumId": albums[albumRef.current.value],
                        "newMediaItems": [
                            {
                                "description": description,
                                "simpleMediaItem": {
                                    "fileName": nameRef.current.value,
                                    "uploadToken": imgToken
                                }
                            }]})
                }).then((resp, err) => {
                    alertRef.current.innerHTML="Success!  Thanks for the pic!";
                    new Promise(r => setTimeout(r, 1000)).then(() => {
                        setShowAlert(false);
                    });
                });
            });
      });
      nameRef.current.value = '';
      personRef.current.value = '';
      noteRef.current.value = '';
      setFilename('Find a photo');
      setShowAlert(true)
  }

  // Used in development; GPhotos API can only write to albums that were
  // created by the API (?!?)
  /*
  <Button className='btn btn-primary' onClick={makeAlbum}>New</Button>
  const makeAlbum = () => { 
      console.log("making album")

      if (typeof(window) === undefined) { return null; }

      const album_url = 'https://photoslibrary.googleapis.com/v1/albums';
      
      getGPhotos().then(token => {
          fetch(album_url, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`
              },
              mode: 'cors',
              body: JSON.stringify({
                "album": { "title": "A Mat-Cha made in heaven" }
              })
            }).then((resp, err) => { 
                console.log("Got response from google");
                console.log(resp);
                return resp.json();
            }).then( album => {
                console.log(album);
            });
      });
  }
  */


  return (
    <Layout location={location} title="The photos">
      <Seo title="The photos" />

      <h4> We'll show you ours if you show us yours! </h4> 
      <p>That's right, it's interactive! </p>

      <p> Click on the blue buttons below to get to any of three albums... AND use the form at the bottom to share your pictures with us (and all the other "guests")!</p>

      <p>No hyper-cute, mildly embarrassing snapshots from way back in the day?
          No problem!  Post a pic or two from our visit with you to &nbsp;
          <em>Road trip shots</em> instead.  Or add some photos to both! </p>

      <p style={{'fontSize':'0.7rem'}}> Got lots of photos (looking at you,
          Mom)?  Send Matt an email and he can set you up with direct access via
          Google Photos... </p>

      <p> Visit the galleries for inspiration from what everyone
          else has uploaded, if you like.
          Then upload a photo and a note below. </p>

      <Row><Col md={4}>
          <Button className="photobutton"
                  onClick={ () => {window.open(galleries.wedding, "_blank")}}>
            Wedding photos</Button>
      </Col>
      <Col md={4}>
          <Button className="photobutton"
                  onClick={ () => {window.open(galleries.old, "_blank")}}>
            Fond memories</Button>
      </Col><Col md={{ span: 4, offset: 0}}>
          <Button className="photobutton"
                  onClick={ () => {window.open(galleries.road, "_blank")}}>
            Road trip shots</Button>
      </Col></Row>

      <hr />
      <Collapse in={showAlert} timeout={1000}>
          <Alert show={showAlert} key="success" variant='success'
            ref={alertRef}>
               Uploading...
          </Alert>
      </Collapse>
      <Form onSubmit={upload}>
          <Form.File id="photo-file" label={filename} custom 
            onChange={handleFile}/>
           <br/> <br/>
          <Form.Label htmlFor='personName'>What's your name? </Form.Label>
          <Form.Control id='photoPerson' name='person' type='text'
           ref={(input) => personRef.current = input} 
           default='your name'>
            </Form.Control>
           <br/>
          <Form.Label htmlFor='galleryChoice'>Post this in</Form.Label>
          <Form.Control as="select" custom
           ref={(input) => albumRef.current = input} >
            <option value="old">Fond memories</option>
            <option value="road">Rovin' wedding</option>
          </Form.Control>
           <br/> <br/>
          <Form.Label htmlFor='photoName'>Title for the photo</Form.Label>
          <Form.Control id='photoName' name='photoName' type='text'
           ref={(input) => nameRef.current = input} 
           default='Embarassing Photo #12'>
            </Form.Control>
           <br/>
          <Form.Label htmlFor='reason'>Why this photo? </Form.Label>
          <Form.Control id='photoReason' name='reason' as='textarea' rows={3}
           ref={(input) => noteRef.current = input} 
           placeholder='Go on, tell us the story!'>
          </Form.Control>
           <br/>
         <Button className='btn btn-primary' onClick={upload}>
           Share with the group</Button>
        </Form>
    </Layout>
  )
}

export default Photos
