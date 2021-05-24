import React, { Component } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "../css/map.css"
import { route } from "./route"

export default class MyMap extends Component {

    static defaultProps = {
        position: ["37.685344", "-97.387217"],
        zoom: 4,
    }

    render() {
        console.log(this.props.position);
        console.log(route.length);
        if (typeof window !== undefined) {
        return (
            <MapContainer center={this.props.position} zoom={this.props.zoom}>
                <TileLayer
                    url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                {route.map(r =>
                    <Marker position={r.pos}>
                        <Popup>{r.label}</Popup>
                    </Marker>
                )}
                }
            </MapContainer>
        );
        }
        return null;
    }
}
