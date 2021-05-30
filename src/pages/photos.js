import * as React from "react"

import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Layout from "../components/layout"
import Seo from "../components/seo"

const albumId = "ACBVj4XmZEW-2Pl704uDw4Rp-V6oHcwWXXdLACc7GjvSVexaYrxHG1Yrtwog6i3itjx9MDQd8jSc";
const galleryUrl = `https://photos.google.com/lr/album/${albumId}`;
const Photos = ({ data, location }) => {

  const noteRef = React.useRef(null);
  const nameRef = React.useRef(null);
  const personRef = React.useRef(null);
  const [photo, setPhoto] = React.useState(null);

// this is a request instance, so we can just call .then()
// to kick off the request.

  const handleFile = (evt) => { 
      const file = evt.target.files[0];
      console.log(file);
      setPhoto(file);
  }

  const upload = (evt) => {
      console.log("uploading???")
      const token = process.env.GOOGLE_PHOTOS_ACCESS_TOKEN;
      console.log(token);

      if (typeof(window) === undefined) { return null; }

      const description = `${personRef.current.value} ` +
        `says: ${noteRef.current.value}`;
      const upload_url = 'https://photoslibrary.googleapis.com/v1/uploads';
      const media_url =
          'https://photoslibrary.googleapis.com/v1/mediaItems:batchCreate';
      
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
                    "albumId": albumId,
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
  }

  const makeAlbum = () => { 
      console.log("making album")
      const token = process.env.GOOGLE_PHOTOS_ACCESS_TOKEN;

      if (typeof(window) === undefined) { return null; }

      const album_url = 'https://photoslibrary.googleapis.com/v1/albums';
      
      fetch(album_url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
          },
          mode: 'cors',
          body: JSON.stringify({
            "album": { "title": "Rovin Album" }
          })
        }).then((resp, err) => { 
            console.log("Got response from google");
            console.log(resp);
            return resp.json();
        }).then( album => {
            console.log(album);
        });
      /* {id: "ACBVj4XmZEW-2Pl704uDw4Rp-V6oHcwWXXdLACc7GjvSVexaYrxHG1Yrtwog6i3itjx9MDQd8jSc", title: "Rovin Album", productUrl: "https://photos.google.com/lr/album/ACBVj4XmZEW-2Pl…oHcwWXXdLACc7GjvSVexaYrxHG1Yrtwog6i3itjx9MDQd8jSc", isWriteable: true}
        */
  }

  return (
    <Layout location={location} title="The photos">
      <Seo title="The photos" />

      <h1> COMING SOON!!  DOES NOT WORK YET!! </h1>

      <p>Were you expecting travel photos?? Sorry! </p>
      <p>Instead, we have, just for you, yet another activity! We thought it would be entertaining to gather a photo album of <em>your</em> favorite pics of <em>us</em>.  </p>

      <p> You can visit the gallery and get inspiration from what everyone else
          has uploaded </p>
          <Button onClick={ () => {window.open(galleryUrl, "_blank")}}>
            Visit the gallery</Button>

      <p> And then, you should upload a photo and a note!</p>
      <Form onSubmit={upload}>
          <Form.File id="photo-file" label="Find a photo" custom 
            onChange={handleFile}/>
          <Form.Label htmlFor='personName'>What's your name? </Form.Label>
          <Form.Control id='photoPerson' name='person' type='text'
           ref={(input) => personRef.current = input} 
           default='your name'>
            </Form.Control>
           <br/>
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
         <Button className='btn btn-primary' onClick={upload}>
           Share with the group</Button>
        </Form>
    </Layout>
  )
}

export default Photos
