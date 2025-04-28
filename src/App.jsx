import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import './assets/styles/main.scss'
import AppRouting from './routes'
import { loadUserFromSession } from './store/user/user.actions'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUserFromSession())
  }, [])

  return (
    <div className="main-layout-container">
      <main>
        <AppRouting />
      </main>
    </div>
  )
}

export default App
