import { useEffect } from 'react'
import Map from './Map'

const MapContainer = ({ coords, quake, closeMap }) => {
    let windowReady = false

    useEffect(() => {
        windowReady = true
    }, [])

    return (
        <div>
            <button onClick={closeMap}>Close</button>
            {/* { windowReady ? <Map coords={coords} quake={quake} /> : null } */}
        </div>
    )
}

export default MapContainer
