import * as React from "react"

const PlaylistTable = ({data}) => {
    if (!data) { return <div>Loading...</div>}
    console.log(data);
    return (
    <div className="playlistArea">
        {Object.entries(data).map((t,i) =>
            <div className="playlistEntry" key={`plEntry${i}`}>
                <h4>{t[1].songName}</h4>
                <h5>{t[1].songArtist}</h5>
                <p><b>{t[1].songPerson}</b> <em>says:</em></p>
                <p><em>{t[1].songReason}</em></p>
                <hr/>
            </div>
        )}
    </div >
   )
}

export default PlaylistTable;
