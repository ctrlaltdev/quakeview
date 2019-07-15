export const getGeolocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(location => { resolve(location) })
  })
}

export const getDistance = (coord1, coord2) => {
  const R = 6371 // Radius of the earth in km
  const dLat = (coord2.lat - coord1.lat) * Math.PI / 180  // Javascript functions in radians
  const dLon = (coord2.lon - coord1.lon) * Math.PI / 180
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(coord1.lat * Math.PI / 180) * Math.cos(coord2.lat * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2) 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = R * c // Distance in km
  return { km: Math.round(d), mi: Math.round(d * 0.62137119) }
}
