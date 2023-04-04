import Axios from '../../constants/axiosConfig';
import React, { useEffect, useState } from 'react'
import TableTask from '../components/TableTask';
import { Backdrop, CircularProgress, Typography } from '@mui/material';

function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const getTasks = () => {
    setLoading(true);
    Axios.get('/task')
      .then(
        (res) => {
          console.log(res.data);
          setTasks(res.data);
          setLoading(false);
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

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

    </>
  )
}

export default HomePage