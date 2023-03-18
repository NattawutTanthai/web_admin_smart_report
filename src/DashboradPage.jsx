import Axios from '../constants/axiosConfig';
import React, { useEffect, useState } from 'react'
import TableTask from './components/TableTask';

function DashboradPage() {
  const [tasks, setTasks] = useState([]);

  const getTasks = () => {
    Axios.get('/task')
      .then(
        (res) => {
          console.log(res.data);
          setTasks(res.data);
        }
      )
  }

  useEffect(() => {
    getTasks()
  }, [])

  return (
    <>
      <TableTask data={tasks} />
    </>
  )
}

export default DashboradPage