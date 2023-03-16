import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import DrawerComp from './components/DrawerComp'
import DashboradPage from './DashboradPage'
import EmployeePage from './EmployeePage'
import TypePage from './TypePage'


function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<DrawerComp />}>
           <Route path="/" element={<DashboradPage />} />
           <Route path="/EmployeePage" element={<EmployeePage />} />
           <Route path="/TypePage" element={<TypePage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
