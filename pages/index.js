import Main from '../layouts/Main'
import { useState, useEffect } from 'react'
import Moment from 'moment'

const getEarthQuakes = () => {
    return new Promise((resolve, reject) =>{
        fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson').then(data => data.json()).then(json => resolve(json)).catch(err => reject(err))
    })
}

const renderQuakes = (quakes = []) => {
    return quakes.map((q, i) => (
        <li className='Earthquake' key={`quake-${q.id}`}>
            <div className='Earthquake__Magnitude'>{ q.properties.mag }</div>
            <div className='Earthquake__Location'>{ q.properties.place }</div>
            <div className='Earthquake__Time'>{ Moment(q.properties.time).local().format('DD-MM-YY HH:mm') }</div>
        </li>
    ))
}

const index = () => {
    const [quakes, updateQuakes] = useState([])

    useEffect(() => {
        getEarthQuakes()
            .then(quakes => { updateQuakes(quakes.features) })
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            getEarthQuakes()
                .then(quakes => { updateQuakes(quakes.features) })
        }, 1000 * 60)

        return () => clearInterval(interval)
    }, [])

    return (
        <Main>
            <ul className='Earthquakes'>
                { renderQuakes(quakes) }
            </ul>
        </Main>
    )
}

export default index
