import Main from '../layouts/Main'
import { useState, useEffect } from 'react'

import { getGeolocation } from '../utils/getGeolocation'
import { newNotification } from '../utils/notifications'

import { getEarthQuakes, renderQuakes, renderNoQuakes } from '../components/Earthquakes'
import Filters from '../components/Filters'
import MapContainer from '../components/MapContainer'

const index = () => {
  const [quakes, updateQuakes] = useState([])
  const [timeframe, updateTimeframe] = useState('day')
  const [threshold, updateThreshold] = useState('4.5')
  const [userLocation, updateUserLocation] = useState(null)
  const [canNotify, updateCanNotify] = useState(false)
  const [map, updateMap] = useState({ isOpen: false })

  let notifications = []

  useEffect(() => {
    updateCanNotify(Notification.permission === 'granted')
    const deniedNotify = Notification.permission === 'denied'

    getGeolocation()
      .then(location => {
        updateUserLocation(location)
      })

    if (!canNotify && !deniedNotify) {
      Notification.requestPermission()
        .then(permission => {
          updateCanNotify(permission === 'granted')
        })
    }
  }, [])

  useEffect(() => {
    getEarthQuakes(timeframe, threshold)
      .then(quakes => { updateQuakes(quakes.features) })
  }, [timeframe, threshold])

  useEffect(() => {
    const interval = setInterval(() => {
      getEarthQuakes(timeframe, threshold)
        .then(quakes => { 
          updateQuakes(quakes.features)
          if (canNotify) {
            notifications.push(newNotification('Quake View', 'New earthquakes'))
          }
        })
    }, 1000 * 60)

    return () => clearInterval(interval)
  }, [timeframe, threshold, canNotify])

  openMap = (coords, quake) => {
    updateMap({ ...coords, ...quake, isOpen: true })
  }

  closeMap = () => {
    updateMap({ isOpen: false })
  }

  const changeTimeframe = (e) => {
    updateTimeframe(e.target.value)
  }

  const changeThreshold = (e) => {
    updateThreshold(e.target.value)
  }

  const timeOptions = [
    { value: 'hour', label: 'Last hour' },
    { value: 'day', label: 'Last day' },
    { value: 'week', label: 'Last week' },
    { value: 'month', label: 'Last month' }
  ]

  const thresholdOptions = [
    { value: 'all', label: 'All' },
    { value: '1.0', label: '1.0+' },
    { value: '2.5', label: '2.5+' },
    { value: '4.5', label: '4.5+' },
    { value: 'significant', label: 'Significants' }
  ]

  return (
    <Main>
      <div className='Filters'>
        <div className='Filters__Timeframe'>
          <Filters prefix='time' selected={timeframe} onChange={changeTimeframe} items={timeOptions} />
        </div>
        <div className='Filters__Threshold'>
          <Filters prefix='magnitude' selected={threshold} onChange={changeThreshold} items={thresholdOptions} />
        </div>
      </div>

      { map.isOpen ? <MapContainer coords={map.coords} quake={map.quake} closeMap={closeMap} /> : null }

      { quakes.length > 0 ? 
        <ul className='Earthquakes'>
          { renderQuakes(quakes, userLocation, openMap) }
        </ul> : renderNoQuakes()
      }
    </Main>
  )
}

export default index
