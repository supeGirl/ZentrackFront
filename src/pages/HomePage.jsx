import {useState, useEffect} from 'react'
import zentralLogo from '../assets/zentral-logo.png'
import {Link} from 'react-router-dom'

export function HomePage() {
  const [text, setText] = useState('Hello, please log in to continue')
  const [isGerman, setIsGerman] = useState(false)
  const [fadeClass, setFadeClass] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeClass('fade-out')

      setTimeout(() => {
        setText(isGerman ? 'Hello, please log in to continue' : 'Hallo, bitte logge dich ein, um fortzufahren')
        setIsGerman(!isGerman)
        setFadeClass('')
      }, 1000)
    }, 3000)

    return () => clearInterval(interval)
  }, [isGerman])

  return (
    <section className="home-page">
      <img src={zentralLogo} alt="Zentral Logo" className="logo" />
      <h1 className={fadeClass}>{text}</h1>

      <Link to="/login" className="login-btn">
        Log In
      </Link>
    </section>
  )
}
