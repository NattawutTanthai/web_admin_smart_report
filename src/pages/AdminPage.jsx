import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Axios from "../../constants/axiosConfig";
import TableAdmin from "../components/TableAdmin"


function AdminPage() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);

    const getEmployees = () => {
        setLoading(true);
        Axios.get('/admin')
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
                รายการ รายชื่อแอดมิน
            </Typography>
            <TableAdmin data={employees} />

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}

export default AdminPage