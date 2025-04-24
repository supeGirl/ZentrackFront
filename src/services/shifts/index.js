const {DEV, VITE_LOCAL} = import.meta.env
import { shiftsService as local } from "./shifts.service.local"
import { shiftsService as remote } from "./shifts.service.remote"
console.log(local)

const service = VITE_LOCAL === 'true' ? local : remote
export const shiftsService = {...service}