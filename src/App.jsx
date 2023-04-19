import { Route, Routes } from 'react-router-dom'
import DrawerComp from './components/DrawerComp'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Dashborad/*" element={<DrawerComp />} />
      </Routes>
    </>
  )
}

export default App
