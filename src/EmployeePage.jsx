import { useEffect, useState } from "react";
import Axios from "../constants/axiosConfig";
import TableEmp from "./components/TableEmp";
import FloatingActionButton from "./components/FloatingActionButton";

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
      <TableEmp data={employees} />
      <FloatingActionButton />
    </>
  )
}

export default EmployeePage