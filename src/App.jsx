import {Routes, Route} from 'react-router'
import {Provider} from 'react-redux'
import zentralLogo from './assets/zentral-logo.png'
import {TimeDashboard} from './pages/TimeDashboard'
import {HomePage} from './pages/HomePage'

import './assets/styles/main.scss'
import { store } from './store/store'

function App() {
  return (
    <Provider store={store}>
      <div className="main-layout-container">
        <main>
          <Routes>
            <Route element={<HomePage />} path="" />
            <Route element={<TimeDashboard />} path="/timedashboard" />
          </Routes>
        </main>
      </div>
    </Provider>
  )
}

export default App
