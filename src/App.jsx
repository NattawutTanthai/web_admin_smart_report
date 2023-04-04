import { Route, Routes } from 'react-router-dom'
import DrawerComp from './components/DrawerComp'
import DashboradPage from './pages/HomePage'
import EmployeePage from './pages/EmployeePage'
import TypePage from './pages/TypePage'
import LoginPage from './pages/LoginPage'
import AdminPage from './pages/AdminPage'

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
