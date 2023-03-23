import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Axios from "../constants/axiosConfig";
import TableEmp from "./components/TableEmp";

function EmployeePage() {
  const [employees, setEmployees] = useState([]);

  const getEmployees = () => {
    Axios.get('/employee')
      .then(
        (res) => {
          console.log(res.data);
          setEmployees(res.data)
        }
      )
  }

  useEffect(() => {
    getEmployees()
  }, [])

  return (
    <>
    <Typography variant='h5' gutterBottom>
      รายการ รายชื่อบุคลากร
    </Typography>
      <TableEmp data={employees} />
    </>
  )
}

export default EmployeePage