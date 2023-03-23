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
    </>
  )
}

export default TypePage