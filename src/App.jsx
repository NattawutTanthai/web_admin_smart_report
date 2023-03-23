import { Route, Routes } from 'react-router-dom'
import DrawerComp from './components/DrawerComp'
import DashboradPage from './pages/DashboradPage'
import EmployeePage from './pages/EmployeePage'
import TypePage from './pages/TypePage'
import LoginPage from './pages/LoginPage'
import AdminPage from './pages/AdminPage'

function App() {
  return (
    <>
      <Routes>
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/" element={<DrawerComp />}>
          <Route path="/" element={<DashboradPage />} />
          <Route path="/EmployeePage" element={<EmployeePage />} />
          <Route path="/TypePage" element={<TypePage />} />
          <Route path="/AdminPage" element={<AdminPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
