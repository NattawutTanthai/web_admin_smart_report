import Axios from '../constants/axiosConfig';
import React, { useEffect, useState } from 'react'
import TableTask from './components/TableTask';
import { Typography } from '@mui/material';

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
    <Typography variant='h5' gutterBottom>
      รายการปัญหา
    </Typography>
      <TableTask data={tasks} />
    </>
  )
}

export default DashboradPage