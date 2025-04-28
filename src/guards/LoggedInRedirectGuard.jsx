import {useSelector} from 'react-redux'
import {useLocation, Navigate} from 'react-router-dom'

const LoggedInRedirectGuard = ({children}) => {
  const location = useLocation()
  const loggedinUser = useSelector((state) => state.userModule.loggedinUser)

  console.log(loggedinUser, 'user from guards')

  // Only allow access if redirected with a specific state

  if (!loggedinUser || !loggedinUser._id) {
    return children
  }

  return <Navigate to="/" replace />
}

export default LoggedInRedirectGuard
