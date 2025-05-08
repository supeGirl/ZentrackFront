export const utilService = {
  makeId,
  getRandomIntInclusive,
  animateCSS,
  debounce,
  getAssetSrc,
  formatTime,
  formatTimeWithoutSec,
  formatDate,
  formatDuration,
  getLiveClockUpdater,
}


function getLiveClockUpdater(setTimeCb) {
  return setInterval(() => {
    setTimeCb((prevTime) => new Date(prevTime.getTime() + 1000))
  }, 1000)
}

function formatDate(dateStr) {
  let raw = typeof dateStr === 'string' ? dateStr : dateStr?.datetime;
  if (!raw) return 'Invalid Date';

  if (!/[Z+-]/.test(raw.slice(-6))) {
    raw += 'Z';
  }

  const date = new Date(raw);
  if (isNaN(date.getTime())) return 'Invalid Date';

  const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
  return date.toLocaleDateString('en-US', options);
}

function formatTime(timestamp) {
  const date = new Date(timestamp)
  return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', second: '2-digit'})
}

function formatTimeWithoutSec(timestamp) {
  let raw = typeof timestamp === 'string' ? timestamp : timestamp?.datetime;
  if (!raw) return 'Invalid Time';

  raw = raw.replace(/(\.\d{3})\d+/, '$1');
  const date = new Date(raw);
  
  if (isNaN(date.getTime())) {
    console.error('Invalid date after sanitization:', raw);
    return 'Invalid Time';
  }

  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
  return Math.floor(Math.random() * (max - min + 1)) + min 
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
