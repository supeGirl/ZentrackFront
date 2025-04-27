import {faker} from '@faker-js/faker'
import {httpService} from '../http.service'

const BASE_URL = 'timedashboard/'

export const shiftsService = {
  loadTime,
}

async function loadTime() {
  return httpService.get(BASE_URL)
}
