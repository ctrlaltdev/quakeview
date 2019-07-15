import Moment from 'moment'
import { magnitudeColoring } from '../utils/magnitudeColoring'
import { getDistance } from '../utils/getGeolocation'

export const getEarthQuakes = (timeframe = 'hour', threshold = 'all') => {
  return new Promise((resolve, reject) =>{
    fetch(`https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${threshold}_${timeframe}.geojson`).then(data => data.json()).then(json => resolve(json)).catch(err => reject(err))
  })
}

export const renderQuakes = (quakes = [], user = {}, openMap = null) => {
  return quakes.map((q, i) => (
    <li className='Earthquake' key={`quake-${q.id}`} onClick={() => { openMap({ lat: q.geometry.coordinates[1], lon: q.geometry.coordinates[0] }, q.properties.mag) }}>
      <div className='Earthquake__Magnitude' style={{ backgroundColor: magnitudeColoring(q.properties.mag) }}><span className='Earthquake__Magnitude__Overlay'>{ q.properties.mag }</span></div>
      <div className='Earthquake__Location'>
        { q.properties.place }
        { user.location ?
          ` - ${ getDistance({ lat: user.location.coords.latitude, lon: user.location.coords.longitude }, { lat: q.geometry.coordinates[1], lon: q.geometry.coordinates[0] })[user.unit].toLocaleString() }${user.unit} from you` :
          null
        }
      </div>
      <div className='Earthquake__Time'><span className='Earthquake__Time__Absolute'>{ Moment(q.properties.time).local().format('MMM, ddd DD [at] hh:mmA') }</span><span className='Earthquake__Time__Relative'>{ Moment(q.properties.time).fromNow() }</span></div>
    </li>
  ))
}

export const renderNoQuakes = () => {
  return (
    <div className='NoEarthquakes'>
      No earthquakes happened within the current filters
    </div>
  )
}