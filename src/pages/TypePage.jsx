import { Backdrop, CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Axios from '../../constants/axiosConfig';
import TableType from '../components/TableType'

function TypePage() {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  const getTypes = () => {
    setLoading(true);
    Axios.get('/type')
      .then(
        (res) => {
          console.log(res.data);
          setTypes(res.data);
          setLoading(false);
        }
      )
  }

  useEffect(() => {
    getTypes()
  }, [])

  return (
    <>
      <Typography variant='h5' gutterBottom>
        รายการ ประเภทปัญหา
      </Typography>
      <TableType data={types} />

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  )
}

export default TypePage