/**
 * Spotify playlist component that queries for API keys
 * with Gatsby's useStaticQuery component
 * uses Firebase to store the playlist meta info
 * uses Spotify API to search for music and update the playlist
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

 import * as React from "react";
 import {Modal, Container, Row, Col, Form, Button} from "react-bootstrap";
 import Alert from "react-bootstrap/Alert";
 import Collapse from "react-bootstrap/Collapse";
 import getFirebase from '../components/myFirebase';
 import {getSpotify} from '../components/api';
 import SpotifyResults from '../components/spotifyResults';
 import PlaylistTable from '../components/playlistTable';
 import Layout from '../components/layout';
 import Seo from '../components/seo';

 const playlistUrl = 'https://open.spotify.com/playlist/4w3iz0Pv77hmxpuzUhPnTN?si=b5fa3e93f54f4008'
 
 const Playlist = ({location, data}) => {
   const [playlistData, setPlaylistData] = React.useState(null);
   const [searchResults, setSearchResults] = React.useState(null);
   const [showModal, setShowModal] = React.useState(false);
   const [songInfo, setSongInfo] = React.useState({});
   const [showAlert, setShowAlert] = React.useState(false);
   // let songUri, songName, songArtist;
   let searchTerms, note={};


   const doSearch = (evt) => {
     evt.preventDefault();

     const terms = searchTerms.value;
     console.log(`Searching for ${terms}`);

     getSpotify().then(spotify => {
        console.log(spotify);

        spotify.search(terms, ["track"], {}, (err, data) => {
          if (err) {
            console.log(`Spotify search got error: ${err}`);
          }
          console.log(`Search results: ${data}`);
          console.log(data);
          setSearchResults( data );
        });
    });
  }

   // Add a track to the playlist
   const doAdd = (evt) => {
     // Called after the song is selected.  Grab song info, display modal.
     setSongInfo({songUri: evt.target.attributes.spotify_uri.textContent,
                 songName: evt.target.attributes.spotify_name.textContent,
                 songArtist: evt.target.attributes.spotify_artist.textContent});
     setShowModal(true);
   }
     
   const cancelSong = evt => { 
       evt.preventDefault();
       setShowModal(false);
   }

   const saveSong = (evt) => {
     // Called from the modal submit; add to spotify and firebase.
     evt.preventDefault();
     console.log("Adding to playlist & firebase: ")
     console.log(songInfo.songName);
     console.log(songInfo.songUri);
     console.log(songInfo.songArtist);
     console.log(note.person);
     console.log(note.reason);
     getSpotify().then(spotify => {
        spotify.addTracksToPlaylist(
           process.env.SPOTIFY_PLAYLISTURI,
           [songInfo.songUri]);
     });
     const entry = firebase.database().ref("/playlist").push();
     entry.set({songName: songInfo.songName, songArtist: songInfo.songArtist, 
             songPerson: note.person, songReason: note.reason});
     setSearchResults(null);
     searchTerms = '';
     setShowModal(false);
     setShowAlert(true);
   }

   const handleModal = (evt) => {
     // called when a field in the modal changes
     note[evt.target.name] = evt.target.value;
   }


   const firebase = getFirebase();

   React.useEffect(() => {
     // firebase = getFirebase();
     console.log("loading firebase data");
     console.log(firebase);
     firebase.database()
      .ref("/playlist")
      .on("value", snapshot => {
        //MSB -- change this to append rather than set.
        console.log(snapshot.val());
        setPlaylistData(snapshot.val())
      });
   }, [firebase])

   return (
     <Layout location={location} title='The playlist'>
     <Seo title="The Playlist" />
     <Container>
       <Row> <Col>
       <p> Ok people, this is important.</p>
       <p> A good playlist is essential to a celebration, right? </p>
       <p> Help us stack this one with all the best tunes for
       the road - you know, those songs that get you tapping the steering wheel
       and drumming the dashboard with the windows down on backcountry roads,
       those sunset ready nostalgic crooners, songs meant for campfires and
       starry skies, and, of course, that song we have to listen to as we roll
       into your city.</p>

       <p>And those get down party songs you want hear when we’re
       kicking it with you in the park (beach, trail, backyard, out on the
       dock...fill in the blank here). </p>

       <p>And, you know, some rocking love songs &mdash;
       it is a wedding, after all. </p>

       <p> Jokes accepted, of course, but don’t be
       surprised when that one you added for giggles gets booted to the B-list
       once it’s come up one too many times. </p>
       
       <p>Top points for new to us songs you
       think we just might love and all those songs you’re guessing we haven’t
       heard in far too long that call up some good back in the day stories we
       can tell each other as we make our way to your place.  </p>

       <p> Leave us a note so we know who to thank.  </p>

       </Col></Row>

       <Row><Col>
        <h3>The playlist so far...</h3>
        <div className="playlistData">
          <PlaylistTable data={playlistData} />
        </div>
       </Col> </Row>
       <Row><Col>
        <br/>
        <p>If you have spotify, you can listen to
           it <a target="_blank" rel="noreferrer" href={playlistUrl}>
             here</a></p>
       </Col> </Row>

       <Row><Col>
       <br />
       <h3>Add your song to our list!</h3>
       <Collapse appear={false} in={showAlert} timeout={1000}
             onEntered={async function() {
                 await new Promise(r => setTimeout(r, 1000));
                 setShowAlert(false);
        }}>
             <Alert show={showAlert} key="success" variant='success'>
                Success!  Thanks for the tunes!
             </Alert>
       </Collapse>
       <Form onSubmit={doSearch}>
         <Form.Group>
         <Form.Label htmlFor="track_search">
           Search for a song &nbsp;</Form.Label>
         <Form.Control id="track_search" type="text" sz="lg"
           ref={(input) => searchTerms = input} name="search" >
         </Form.Control>
         <Button className='btn btn-primary search' onClick={doSearch}>
           Search Spotify</Button>
         </Form.Group>
       </Form>
       <SpotifyResults results={searchResults} add_callback={doAdd} />
       </Col></Row>
     </Container>
     <Modal show={showModal} size="lg" 
        backdrop="static" centered keyboard="false">
       <Modal.Header>
         Add to the playlist!
       </Modal.Header>
       <Modal.Body>
         <Form onSubmit={saveSong}>
           <Form.Label htmlFor='personName'>What's your name? </Form.Label>
           <Form.Control id='songPerson' name='person' type='text'
            onChange={handleModal}
            default='your name'>
             </Form.Control>
             <br/>
           <Form.Label htmlFor='reason'>Why this song? </Form.Label>
           <Form.Control id='songReason' name='reason' as='textarea' rows={3}
            onChange={handleModal}
            placeholder='Go on, tell us the story!'>
           </Form.Control>
           <br/>
           <Button onClick={saveSong} className='btn btn-primary'>
             Submit</Button>&nbsp;
           <Button onClick={cancelSong} className='btn btn-secondary'>
             Cancel</Button>
         </Form>
       </Modal.Body>
     </Modal>
     </Layout>
   )
 
 }

export default Playlist
