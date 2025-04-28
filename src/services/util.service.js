export const utilService = {
  makeId,
  getRandomIntInclusive,
  animateCSS,
  debounce,
  getAssetSrc,
  formatTime,
  formatDate,
  formatDuration,
  getLiveClockUpdater,
}

function getFaketime() {
  return {
    year: 2025,
    month: 4,
    day: 27,
    hour: 13,
    minute: 15,
    seconds: 17,
    milliSeconds: 211,
    dateTime: '2025-04-27T13:15:17.2118289',
    date: '04/27/2025',
    time: '13:15',
    timeZone: 'Europe/Berlin',
    dayOfWeek: 'Sunday',
    dstActive: true,
  }
}

function getLiveClockUpdater(setTimeCb) {
  return setInterval(() => {
    setTimeCb((prevTime) => new Date(prevTime.getTime() + 1000))
  }, 1000)
}

function formatDate(dateStr) {
  const options = {year: 'numeric', month: 'long', day: 'numeric'}
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', options)
}
function formatTime(timestamp) {
  const date = new Date(timestamp)
  return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', second: '2-digit'})
}

function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${minutes} min ${secs < 10 ? '0' : ''}${secs} sec`
}

function makeId(length = 6) {
  var txt = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return txt
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

function debounce(func, timeout = 300) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}

function animateCSS(el, animation) {
  const prefix = 'animate__'
  return new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`

    el.classList.add(`${prefix}animated`, animationName)

    function handleAnimationEnd(event) {
      event.stopPropagation()
      el.classList.remove(`${prefix}animated`, animationName)
      resolve('Animation ended')
    }
    el.addEventListener('animationend', handleAnimationEnd, {once: true})
  })
}

function getAssetSrc(name) {
  const path = `/src/assets/img/${name}`
  const modules = import.meta.globEager('/src/assets/img/*')
  const mod = modules[path]
  return mod.default
}
