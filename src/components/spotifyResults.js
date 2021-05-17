import * as React from "react"
  
const SpotifyResults = ({results, add_callback}) => {
    if (!results) { return <div></div>}
    console.log(results);
    return (
        <table className="table">
            <thead>
                <tr>
                    <th></th>
                    <th>Track</th>
                    <th>Artist</th>
                    <th>Album</th>
                    <th>Year</th>
                </tr>
            </thead><tbody>
                {results.tracks.items.map((t) => 
                    <tr>
                        <td><button className='btn btn-primary'
                                    spotify_uri={t.uri} 
                                    spotify_artist={t.artists.map(a => a.name).join(',')}
                                    spotify_name={t.name}
                                    onClick={add_callback}>
                              Add to playlist</button></td>
                        <td>{t.name}</td>
                        <td>{t.artists.map(a => a.name).join(', ')}</td>
                        <td>{t.album.name}</td>
                        <td>{t.album.release_date.slice(0,4)}</td>
                    </tr>)
                }
            </tbody>
        </table>
    )
 }

export default SpotifyResults;