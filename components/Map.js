import { Map as LeafMap, TileLayer, Marker, Popup } from 'react-leaflet'

const Map = ({ coord, quake }) => {
    return (
        <LeafMap center={[coord.lat, coord.lon]} zoom={13}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
            <Marker position={[coord.lat, coord.lon]}>
                <Popup>{ quake }</Popup>
            </Marker>
        </LeafMap>
    )
}

export default Map
