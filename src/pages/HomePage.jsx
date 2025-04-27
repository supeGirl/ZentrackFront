import zentralLogo from '../assets/zentral-logo.png'
import { Link } from 'react-router-dom'


export function HomePage() {
  return (
    <section className="home-page">
      <img src={zentralLogo} alt="Zentral Logo" className="logo" />
      <h1>Hello, please log in to continue</h1>

      <Link to="/login" className="login-btn">
        Log In
      </Link>
    </section>
  )
}
