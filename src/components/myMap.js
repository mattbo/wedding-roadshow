import React, { useState, useEffect, useRef } from 'react'
import { GoogleMap, LoadScript, Data } from '@react-google-maps/api';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Collapse from 'react-bootstrap/Collapse';
import Alert from 'react-bootstrap/Alert';
import getFirebase from './myFirebase'
import "../css/map.css"

const containerStyle = {
    // width: '700px',
    width: '100%',
    height: '500px'
};

const center = { lat: 37.685344, lng: -97.387217};
const libraries = ['places'];


const MyMap = () => {

    let note={};
    const markerData = useRef([]);
    const [placeInfo, setPlaceInfo] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerms, setSearchTerms] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const searchObj = useRef({});

    const firebase = getFirebase();

    useEffect(() => {
     firebase.database()
      .ref("/map_points")
      .on("value", snapshot => {
        console.log(snapshot.val());
        markerData.current = (snapshot.val() || []);
        if ("mapRef" in searchObj.current) {
            // map loaded before firebase...
            Object.values(markerData.current).forEach(
                  m => buildMarker(m) ); 
        }

      });
    }, [firebase])

    const handleModal = (evt) => {
        note[evt.target.name] = evt.target.value;
    }

    const cancelPlace = evt => {
        evt.preventDefault();
        setShowModal(false);
    }

    const savePlace = (evt) => {
        evt.preventDefault();
        const timestamp = new Date();
        const loc = { lat: placeInfo.geometry.location.lat(),
                      lng: placeInfo.geometry.location.lng() };
        const entry = firebase.database().ref("/map_points").push();
        const placeObj = {placeLoc: loc,
                          placeName: placeInfo.name,
                          placePerson: note.person,
                          placeReason: note.reason,
                          testing: "yep",
                          creationDate: timestamp.toJSON() };
        entry.set(placeObj);
        buildMarker(placeObj);
        setShowModal(false);
        setSearchResults([]);
        setSearchTerms(null);
        setShowAlert(true);
    }

    const buildMarker = ({placeLoc, placeName, placePerson,
                          placeReason, visited}) => {
        const noteStr = `<h3>${placeName}</h3>` +
                `<p><em>${placePerson} says:</em></p>` +
                `<p>${placeReason}</p>`;
        const iw = new global.google.maps.InfoWindow({ content:noteStr });
        const m = new global.google.maps.Marker({
            position: placeLoc,
            map: searchObj.current.mapRef,
            color: visited ? "green" : "blue",
            title: placeName});
        m.addListener("click", () => { iw.open(searchObj.current.mapRef, m); });
    }


    const doSearch = (evt) => {
        evt.preventDefault();
        const terms = searchTerms.value
        console.log(`Searching for ${terms}`)
        searchObj.current.mapService.textSearch({query: terms},
            (results, status) => {
                console.log(results);
                console.log(status);
                setSearchResults(results);
        })
    }

    // called from the MapsResults button
    const doAdd = (evt) => {
        let place = searchResults[
            parseInt(evt.target.attributes.results_idx.textContent)];
        setPlaceInfo(place);
        setShowModal(true);
    }

    if (typeof window !== undefined) {
      return (
         <LoadScript
              libraries={libraries}
              googleMapsApiKey={process.env.FIREBASE_APIKEY} >

            <GoogleMap mapContainerStyle={containerStyle}
              onLoad={ (map) => { 
                  searchObj.current.mapRef = map;
                  searchObj.current.mapService = new global.google.maps.places
                      .PlacesService(searchObj.current.mapRef);

                  // Load the GeoJson for the route.  Each section will have
                  // a 'name' property set to either 'past' or 'future'
                  map.data.loadGeoJson("/wedding_path.json");

                  // Switch on the 'name' property to style the line
                  map.data.setStyle(function(feature) {
                      if (feature.getProperty('name') === 'past') { 
                          return {'strokeColor': 'red'};
                      } else { 
                          return {'strokeColor': 'green'} ;
                      }
                  });
                  console.log(markerData.current);
                  Object.values(markerData.current).forEach(
                        m => buildMarker(m) ); 
              }}
              center={center} zoom={4}>
              <Data options={{
                  clickable: false
              }} />

            </GoogleMap>
        <Collapse appear={false} in={showAlert} timeout={1000}
              onEntered={async function() {
                  await new Promise(r => setTimeout(r, 1000));
                  setShowAlert(false);
         }}>
              <Alert show={showAlert} key="success" variant='success'>
                 Success!  Thanks for the tip!
              </Alert>
        </Collapse>
        <Form onSubmit={doSearch}>
            <Form.Group controlId="place_search">
              <Form.Label>
                Find your favorite spot!</Form.Label>
              <Form.Control type="text" sz="lg"
                  ref={(input) => setSearchTerms(input)} name="search" >
              </Form.Control>
              <Button className='btn btn-primary search' onClick={doSearch}>
                    Search Google Maps</Button>
            </Form.Group>
          </Form>
          <MapsResults results={searchResults} add_callback={doAdd} />
     <Modal show={showModal} size="lg"
        backdrop="static" centered keyboard="false">
       <Modal.Header>
         <h3> Add <em>{placeInfo ? placeInfo.name: "your spot"} </em>
              to the map! </h3>
       </Modal.Header>
       <Modal.Body>
         <Form onSubmit={savePlace}>
           <Form.Group controlId="placePerson">
             <Form.Label>What's your name? </Form.Label>
             <Form.Control name='person' type='text'
              onChange={handleModal}
              default='your name'>
             </Form.Control></Form.Group>
             <br/>
           <Form.Group controlId="placeReason">
             <Form.Label>Why this spot? </Form.Label>
             <Form.Control name='reason' as='textarea' rows={3}
              onChange={handleModal}
              placeholder='Go on, tell us the story!'>
             </Form.Control>
           </Form.Group>
           <br/>
           <Button onClick={savePlace} className='btn btn-primary'>
             Submit</Button>&nbsp;
           <Button onClick={cancelPlace} className='btn btn-secondary'>
             Cancel</Button>
         </Form>
       </Modal.Body>
     </Modal>
        </LoadScript>
      );
    } 
    return null;
}

const MapsResults = ({results, add_callback}) => {
    if (!results || results.length === 0) { return <div /> }
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th aria-label="Add to map"></th>
                    <th>Name</th>
                    <th>Address</th>
                </tr>
            </thead><tbody>
                {results.map((t, i) => 
                    <tr key={t.place_id}>
                        <td><Button className='btn btn-primary'
                            results_idx={i}
                            place_location={t.geometry.location} 
                            place_name={t.name}
                            onClick={add_callback}>
                              Add to map</Button></td>
                        <td>{t.name}</td>
                        <td>{t.formatted_address}</td>
                    </tr>)
                }
            </tbody>
        </Table>
    )
}

export default MyMap;
