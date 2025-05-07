import {useState} from 'react'
import {ImgUploader} from '../cmps/ImgUploader'
import {userService} from '../services/user'
import {logInRequest, signupRequest} from '../store/user/user.actions'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router'


export function LoginPage() {
  const [credentials, setCredentials] = useState(userService.getEmptyUser())
  const [isSignup, setIsSignup] = useState(false)
  const dispatch = useDispatch()
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

    if (isSignup) {
      if (!credentials.username || !credentials.password || !credentials.fullname) return

      dispatch(signupRequest({userData:credentials, navigate}))
    } else {
      if (!credentials.username || !credentials.password) return

      dispatch(logInRequest({userData:credentials, navigate}))
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
