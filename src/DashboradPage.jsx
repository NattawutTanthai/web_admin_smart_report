import Axios from '../constants/axiosConfig';
import React, { useEffect, useState } from 'react'
import TableComp from './components/TableComp'
import TableDropDown from './components/TableDropdown';

function DashboradPage() {
  const [tasks, setTasks] = useState([]);

  const getTasks = () => {
    Axios.get('/task')
    .then(
      (res) => {
        console.log(res.data);
        setTasks(res.data)
      }
    )
  }

  useEffect(() => {
    getTasks()
  }, [])

  return (
    <>
      {/* <TableComp data={tasks} /> */}
      <TableDropDown data={tasks} /> 
    </>
  )
}

export default DashboradPage