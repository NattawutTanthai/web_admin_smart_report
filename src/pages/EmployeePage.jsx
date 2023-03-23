import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Axios from "../../constants/axiosConfig";
import TableEmp from "../components/TableEmp";

function EmployeePage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const getEmployees = () => {
    setLoading(true);
    Axios.get('/employee')
      .then(
        (res) => {
          setLoading(false);
          console.log(res.data);
          setEmployees(res.data);
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

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  )
}

export default EmployeePage