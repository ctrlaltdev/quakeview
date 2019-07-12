import Main from '../layouts/Main'
import { useState, useEffect } from 'react'
import Moment from 'moment'
import { magnitudeColoring } from '../utils/magnitudeColoring'

const getEarthQuakes = (timeframe = 'hour', threshold = 'all') => {
    return new Promise((resolve, reject) =>{
        fetch(`https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${threshold}_${timeframe}.geojson`).then(data => data.json()).then(json => resolve(json)).catch(err => reject(err))
    })
}

const renderQuakes = (quakes = []) => {
    return quakes.map((q, i) => (
        <li className='Earthquake' key={`quake-${q.id}`}>
            <div className='Earthquake__Magnitude' style={{ backgroundColor: magnitudeColoring(q.properties.mag) }}><span className='Earthquake__Magnitude__Overlay'>{ q.properties.mag }</span></div>
            <div className='Earthquake__Location'>{ q.properties.place }</div>
            <div className='Earthquake__Time'><span className='Earthquake__Time__Absolute'>{ Moment(q.properties.time).local().format('MMM, ddd DD [at] hh:mmA') }</span><span className='Earthquake__Time__Relative'>{ Moment(q.properties.time).fromNow() }</span></div>
        </li>
    ))
}

const renderNoQuakes = () => {
    return (
        <div className='NoEarthquakes'>
            No earthquakes happened within the current filters
        </div>
    )
}

const index = () => {
    const [quakes, updateQuakes] = useState([])
    const [timeframe, updateTimeframe] = useState('hour')
    const [threshold, updateThreshold] = useState('4.5')

    useEffect(() => {
        getEarthQuakes(timeframe, threshold)
            .then(quakes => { updateQuakes(quakes.features) })
    }, [timeframe, threshold])

    useEffect(() => {
        const interval = setInterval(() => {
            getEarthQuakes(timeframe, threshold)
                .then(quakes => { updateQuakes(quakes.features) })
        }, 1000 * 60)

        return () => clearInterval(interval)
    }, [timeframe, threshold])

    const changeTimeframe = (e) => {
        updateTimeframe(e.target.value)
    }

    const changeThreshold = (e) => {
        updateThreshold(e.target.value)
    }

    return (
        <Main>
            <div>
                <input id='hour' type='radio' value='hour' checked={timeframe === 'hour'} onChange={changeTimeframe} /> <label htmlFor='hour'>Last hour</label>
                <input id='day' type='radio' value='day' checked={timeframe === 'day'} onChange={changeTimeframe} /> <label htmlFor='day'>Last day</label>
                <input id='week' type='radio' value='week' checked={timeframe === 'week'} onChange={changeTimeframe} /> <label htmlFor='week'>Last week</label>
            </div>
            <div>
                <input id='tall' type='radio' value='all' checked={threshold === 'all'} onChange={changeThreshold} /> <label htmlFor='tall'>All</label>
                <input id='t1.0' type='radio' value='1.0' checked={threshold === '1.0'} onChange={changeThreshold} /> <label htmlFor='t1.0'>1.0+</label>
                <input id='t2.5' type='radio' value='2.5' checked={threshold === '2.5'} onChange={changeThreshold} /> <label htmlFor='t2.5'>2.5+</label>
                <input id='t4.5' type='radio' value='4.5' checked={threshold === '4.5'} onChange={changeThreshold} /> <label htmlFor='t4.5'>4.5+</label>
                <input id='tsignificant' type='radio' value='significant' checked={threshold === 'significant'} onChange={changeThreshold} /> <label htmlFor='tsignificant'>Significants</label>
            </div>
            { quakes.length > 0 ? 
                <ul className='Earthquakes'>
                    { renderQuakes(quakes) }
                </ul> : renderNoQuakes()
            }
        </Main>
    )
}

export default index
