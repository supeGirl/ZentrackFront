import {useState} from 'react'
import {useNavigate} from 'react-router'

import {ImgUploader} from '../cmps/ImgUploader'
import {userService} from '../services/user'
import { login, signup } from '../store/user/user.actions'


export function LoginPage() {
  const [credentials, setCredentials] = useState(userService.getEmptyUser())
  const [isSignup, setIsSignup] = useState(false)
  const navigate = useNavigate()

  function clearState() {
    setCredentials({username: '', password: '', fullname: '', imgUrl: ''})
  }

  function handleChange(ev) {
    const field = ev.target.name
    const value = ev.target.value
    setCredentials((credentials) => ({...credentials, [field]: value}))
  }

  async function handleSubmit(ev) {
    ev.preventDefault()
    console.log(ev);
    

    if (isSignup) {
      if (!credentials.username || !credentials.password || !credentials.fullname) return
      await signup(credentials)
    } else {
      if (!credentials.username || !credentials.password) return
      await login(credentials)
    }

    clearState()
    navigate('/timedashboard')
  }

  function onUploaded(imgUrl) {
    setCredentials((credentials) => ({...credentials, imgUrl}))
  }

  return (
    <div>
      <p>Please login or sign up to continue</p>
      <form className="signup-form" onSubmit={handleSubmit}>
        {isSignup && (
          <input
            type="text"
            name="fullname"
            value={credentials.fullname}
            placeholder="Fullname"
            onChange={handleChange}
            required={isSignup}
          />
        )}
        <input
          type="text"
          name="username"
          value={credentials.username}
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          placeholder="Password"
          onChange={handleChange}
          required
        />
        {isSignup && <ImgUploader onUploaded={onUploaded} />}
        <button>{isSignup ? `Sign Up` : `Log In`}</button>
      </form>
      <p>
        {isSignup ? `Already have an account? ` : `Don’t have an account? `}
        <button type="button" onClick={() => setIsSignup(!isSignup)} className="toggle-auth-mode">
          {isSignup ? `Log In` : `Sign Up`}
        </button>
      </p>
    </div>
  )
}
