import logo from '../assets/zentral-logo.png'

export function Loader() {
  return (
    <div className="loader-container">
      <img src={logo} alt="Zentrack Logo" className="logo-loader" />
    </div>
  )
}
