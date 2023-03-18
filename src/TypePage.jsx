import { Fab } from '@mui/material';
import { green } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';
import React, { useEffect, useState } from 'react'
import Axios from '../constants/axiosConfig';
import TableType from './components/TableType'

function TypePage() {
  const [types, setTypes] = useState([]);

  const getTypes = () => {
    Axios.get('/type')
      .then(
        (res) => {
          console.log(res.data);
          setTypes(res.data);
        }
      )
  }

  useEffect(() => {
    getTypes()
  }, [])

  return (
    <>
      <TableType data={types} />
      <Fab sx={{
        position: 'absolute',
        bottom: 16,
        right: 16,
        bgcolor: green[500],
        '&:hover': {
          bgcolor: green[700],
        },
      }} color='success'>
        <AddIcon />
      </Fab>
    </>
  )
}

export default TypePage