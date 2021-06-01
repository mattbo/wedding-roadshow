import * as React from "react"

import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Layout from "../components/layout"
import Seo from "../components/seo"
import {getGPhotos} from '../components/api';

const albums = {
   road: "ACBVj4XmZEW-2Pl704uDw4Rp-V6oHcwWXXdLACc7GjvSVexaYrxHG1Yrtwog6i3itjx9MDQd8jSc",
   old:  "ACBVj4WnMtckBVj-QOO5TaY5YiL-_MtFFxx89HPVjxkDqAsZ43I5h83mH--UWaup6zliRi9KC-dc"
}

const galleries = {
    old: 'https://photos.app.goo.gl/cfzqvhYyRZJqDVwAA',
    road: 'https://photos.app.goo.gl/CScuJ7N5V9YAXYcQ9'
}

const Photos = ({ data, location }) => {

  const noteRef = React.useRef(null);
  const nameRef = React.useRef(null);
  const personRef = React.useRef(null);
  const albumRef = React.useRef(null);
  const [photo, setPhoto] = React.useState(null);
  const [filename, setFilename] = React.useState("Find a photo");

// this is a request instance, so we can just call .then()
// to kick off the request.

  const handleFile = (evt) => { 
      console.log(`Album: ${albumRef.current.value}`);
      const file = evt.target.files[0];
      console.log(file);
      setFilename(file.name);
      setPhoto(file);
  }

  const upload = (evt) => {
      console.log("uploading???")
      if (typeof(window) === undefined) { return null; }

      const description = `${personRef.current.value} ` +
        `says: ${noteRef.current.value}`;
      const upload_url = 'https://photoslibrary.googleapis.com/v1/uploads';
      const media_url =
          'https://photoslibrary.googleapis.com/v1/mediaItems:batchCreate';
      
      console.log(`Posting to album ${albumRef.current.value}`);

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
                    console.log("Got mediaItem response")
                    console.log(resp);
                    console.log(err);
                });
            });
      });
      nameRef.current.value = '';
      personRef.current.value = '';
      noteRef.current.value = '';
      setFilename('Find a photo');
  }

  return (
    <Layout location={location} title="The photos">
      <Seo title="The photos" />

      <h4>Were you expecting travel photos?? Sorry! </h4>
      <p>Instead we have, just for you, yet another activity! We thought it
          would be entertaining to gather a photo album of <em>your </em>
          favorite pics of <em>us</em>.  </p>
      <p>No hyper-cute, mildly embarrassing snapshots from way back in the day?
          No problem!  You should post something to our roving wedding album
          instead.  Or add some photos to both! </p>

      <p style={{'font-size':'0.7rem'}}> Got lots of photos (looking at you,
          Mom)?  Send Matt an email and he can set you up with direct access via
          Google Photos... </p>

      <p> You can visit the galleries and get inspiration from what everyone
          else has uploaded </p>
      <Row><Col md={5}>
          <Button onClick={ () => {window.open(galleries.old, "_blank")}}>
            Show me fond memories</Button>
      </Col><Col md={{ span: 5, offset: 2}}>
          <Button onClick={ () => {window.open(galleries.road, "_blank")}}>
            Gimme some Ro' Sho' Pho-to!</Button>
      </Col></Row>

      <br />
      <p> And then, you should upload a photo and a note!</p>
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

  // Used in development; GPhotos API can only write to albums that were
  // created by the API (?!?)
  /*
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

}

export default Photos
