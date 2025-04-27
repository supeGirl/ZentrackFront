const {DEV, VITE_LOCAL} = import.meta.env
import { utilService } from "../util.service"
import { shiftsService as local } from "./shifts.service.local"
import { shiftsService as remote } from "./shifts.service.remote"
// console.log(local)

 function createShift(startTime, endTime) {
    return {
      id: utilService.makeId(),
      startTime,
      endTime,
    }
  }

const service = VITE_LOCAL === 'true' ? local : remote
export const shiftsService = {...service, createShift}