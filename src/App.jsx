import {Routes, Route} from 'react-router'
import {Provider} from 'react-redux'
import zentralLogo from './assets/zentral-logo.png'
import {TimeDashboard} from './pages/TimeDashboard'
import {HomePage} from './pages/HomePage'

import './assets/styles/main.scss'

function App() {
  return (
    <div className="main-layout-container">
      <main>
        <Routes>
          <Route element={<HomePage />} path="" />
          <Route element={<TimeDashboard />} path="/timedashboard" />
        </Routes>
      </main>
    </div>
  )
}

export default App
