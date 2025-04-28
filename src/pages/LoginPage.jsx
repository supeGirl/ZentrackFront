import {useState} from 'react'
import {useNavigate} from 'react-router'

import {ImgUploader} from '../cmps/ImgUploader'
import {userService} from '../services/user'
import {logInRequest, signupRequest} from '../store/user/user.actions'
import {useDispatch} from 'react-redux'
import {showErrorMsg} from '../services/event-bus.service'

export function LoginPage() {
  const [credentials, setCredentials] = useState(userService.getEmptyUser())
  const [isSignup, setIsSignup] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

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

    if (isSignup) {
      if (!credentials.username || !credentials.password || !credentials.fullname) return
      try {
        await dispatch(signupRequest(credentials))
        navigate('/timedashboard')
      } catch (err) {
        console.error('Signup failed:', err)
        showErrorMsg('Signup failed. Try again.')
      }
    } else {
      if (!credentials.username || !credentials.password) return
      try {
        console.log(credentials)
        await dispatch(logInRequest(credentials))
        navigate('/timedashboard')
      } catch (err) {
        console.error('Login failed:', err)
        showErrorMsg('Login failed. Check username or password.')
      }
    }

    clearState()
  }

  function onUploaded(imgUrl) {
    setCredentials((credentials) => ({...credentials, imgUrl}))
  }

  return (
    <div className="login-page">
      <div className="page-imgs"></div>
      <div className="login-container">
        <div className="login-content">
          <div className="login-form-container">
            <form className="main-login-form" onSubmit={handleSubmit}>
              <div className="form-header">
                <div className="sub-title">
                  <h5>Please {isSignup ? 'sign up' : 'log in'} to continue</h5>
                </div>
              </div>

              <div className="login-form-input-container">
                {isSignup && (
                  <div className="input-container">
                    <input
                      type="text"
                      name="fullname"
                      value={credentials.fullname}
                      placeholder="Full Name"
                      onChange={handleChange}
                      required
                    />
                  </div>
                )}
                <div className="input-container">
                  <input
                    type="text"
                    name="username"
                    value={credentials.username}
                    placeholder="Username"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-container">
                  <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    placeholder="Password"
                    onChange={handleChange}
                    required
                  />
                </div>

                {isSignup && <ImgUploader onUploaded={onUploaded} className="img-uploader" />}
              </div>

              <button type="submit" className="login-btn">
                <span>{isSignup ? 'Sign Up' : 'Log In'}</span>
              </button>
            </form>

            <p>
              {isSignup ? `Already have an account?` : `Don’t have an account?`}
              <button type="button" onClick={() => setIsSignup(!isSignup)} className="toggle-auth-mode">
                {isSignup ? 'Log In' : 'Sign Up'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
