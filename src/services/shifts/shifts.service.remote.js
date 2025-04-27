
// import {faker} from '@faker-js/faker'
// import { httpService } from '../http.service'

// const BASE_URL = 'timedashboard/'

// export const shiftsService = {
//     loadTime,
//   }
  
//   async function loadTime() {
//     return httpService.get(BASE_URL)

//   }

export const shiftsService = {
  loadTime,
}

async function loadTime() {
  try {
    const res = await fetch('https://timeapi.io/api/Time/current/zone?timeZone=Europe/Berlin')
    if (!res.ok) throw new Error(`Failed to fetch time: ${res.statusText}`)

    const data = await res.json()

    return data
  } catch (err) {
    console.error('getBerlinTime failed', err)
    throw err
  }
}
