import * as React from "react"
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
  
const SpotifyResults = ({results, add_callback}) => {
    if (!results) { return <div></div>}
    console.log(results);
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th aria-label="Add to playlist"></th>
                    <th>Track</th>
                    <th>Artist</th>
                    <th>Album</th>
                    <th>Year</th>
                </tr>
            </thead><tbody>
                {results.tracks.items.map((t) => 
                    <tr>
                        <td><Button className='btn btn-primary'
                                    spotify_uri={t.uri} 
                                    spotify_artist={t.artists.map(a => a.name).join(',')}
                                    spotify_name={t.name}
                                    onClick={add_callback}>
                              Add to playlist</Button></td>
                        <td>{t.name}</td>
                        <td>{t.artists.map(a => a.name).join(', ')}</td>
                        <td>{t.album.name}</td>
                        <td>{t.album.release_date.slice(0,4)}</td>
                    </tr>)
                }
            </tbody>
        </Table>
    )
 }

export default SpotifyResults;
