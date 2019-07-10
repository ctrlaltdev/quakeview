import { useState, useEffect } from 'react'
import Moment from 'moment'

const getEarthQuakes = () => {
    return new Promise((resolve, reject) =>{
        fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson').then(data => data.json()).then(json => resolve(json)).catch(err => reject(err))
    })
}

const renderQuakes = (quakes = []) => {
    return quakes.map((q, i) => (
        <div key={`quake-${q.id}`}>{ q.properties.title } - { Moment(q.properties.time).local().format('DD-MM-YY HH:mm') }</div>
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
        <div>
            { renderQuakes(quakes) }
        </div>
    )
}

export default index
