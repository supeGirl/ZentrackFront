import {TimeDashboard} from './pages/TimeDashboard'
import {HomePage} from './pages/HomePage'
import {LoginPage} from './pages/LoginPage'
import LoggedInRedirectGuard from './guards/LoggedInRedirectGuard'
import { Route, Routes } from 'react-router'

const AppRouting = (props) => {
  return (
    <Routes>
      <Route element={<HomePage />} path="" />
      <Route element={<TimeDashboard />} path="/timedashboard" />
      <Route
        element={
          <LoggedInRedirectGuard>
            <LoginPage />
          </LoggedInRedirectGuard>
        }
        path="/login"
      />
    </Routes>
  )
}

export default AppRouting
