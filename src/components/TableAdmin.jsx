import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from '@mui/icons-material/Add';
import Axios from '../../constants/axiosConfig';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Backdrop, CircularProgress, Fab, TextField, Typography } from '@mui/material';
import { green } from '@mui/material/colors';

export default function TableAdmin({ data }) {
    const [flagModal, setFlagModal] = useState(true);

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [dataModal, setDataModal] = useState({});

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const styleModal = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
        width: 400
    };


    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleSave = () => {
        setOpen(false);
        setLoading(true);
        console.log("fname", fname, "lname", lname, "phone", phone, "username", username);
        if (flagModal) {
            Axios.post('/admin', {
                fname: fname,
                lname: lname,
                phone: phone,
                username: username,
                password: password
            })
                .then(
                    (res) => {
                        setLoading(false);
                        console.log(res.data);
                        alert("บันทึกเสร็จสิ้นแล้ว!!!");
                        window.location.reload();
                    }
                )
        } else {
            Axios.put(`/admin/${dataModal._id}`, {
                fname: fname,
                lname: lname,
                phone: phone,
                username: username
            })
                .then(
                    (res) => {
                        setLoading(false);
                        console.log(res.data);
                        alert("แก้ไขเสร็จสิ้นแล้ว!!!");
                        window.location.reload();
                    }
                )
        }

    }

    const handleDelete = (id) => {
        console.log("delete", id);
        let text = "คุณแน่ใจว่าคุณต้องการจะลบข้อมูล?";
        if (confirm(text) == true) {
            setLoading(true);
            Axios.delete(`/admin/${id}`)
                .then(
                    () => {
                        setLoading(false);
                        alert("ลบเสร็จสิ้นแล้ว!!!");
                        window.location.reload();
                    }
                )
        }

    }
    const handleAdd = () => {
        setFlagModal(true);
        setFname("");
        setLname("");
        setPhone("");
        setUsername("");
        handleOpen();
    }

    const handleEdit = (emp) => {
        setFlagModal(false);
        setDataModal(emp);
        setFname(emp.fname);
        setLname(emp.lname);
        setPhone(emp.phone);
        setUsername(emp.username);
        handleOpen();
    }

    return (
        <>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">ชื่อ</TableCell>
                                <TableCell align="center">Username</TableCell>
                                <TableCell align="center">เบอร์ติดต่อ</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((emp) => (
                                <TableRow
                                    key={emp._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="left">{emp.fname} {emp.lname} </TableCell>
                                    <TableCell align="center">{emp.username}</TableCell>
                                    <TableCell align="center">{emp.phone}</TableCell>
                                    <TableCell align="center">
                                        <Button onClick={() => handleDelete(emp._id)} variant="outlined" color='error' startIcon={<DeleteIcon color='error' />}>
                                            ลบ
                                        </Button>{" "}
                                        <Button onClick={() => handleEdit(emp)} variant="outlined" color='warning' startIcon={<CreateIcon color='warning' />}>
                                            แก้ไข
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50, 100]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={styleModal}>
                    <div className='space-y-5'>
                        <Typography gutterBottom variant='h5'>{flagModal ? ("สร้างรายชื่อ") : ("แก้ไขรายชื่อ")}</Typography>
                        <TextField fullWidth label="ชื่อ" defaultValue={fname} onChange={(e) => setFname(e.target.value)} variant="outlined" color="warning" />
                        <TextField fullWidth label="นามสกุล" defaultValue={lname} onChange={(e) => setLname(e.target.value)} variant="outlined" color="warning" />
                        <TextField fullWidth label="เบอร์ติดต่อ" defaultValue={phone} onChange={(e) => setPhone(e.target.value)} variant="outlined" color="warning" />
                        <TextField fullWidth label="Username" defaultValue={username} onChange={(e) => setUsername(e.target.value)} variant="outlined" color="warning" />
                        <TextField fullWidth label="Password" type="password" defaultValue={username} onChange={(e) => setPassword(e.target.value)} variant="outlined" color="warning" />

                        <div className='flex flex-row space-x-2 justify-center'>
                            <Button variant="contained" color='success' fullWidth onClick={handleSave}>บันทึก</Button>
                            <Button variant="contained" color='error' fullWidth onClick={handleClose}>ยกเลิก</Button>
                        </div>
                    </div>
                </Box>
            </Modal>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <Fab onClick={() => handleAdd()} sx={{
                position: 'absolute',
                bottom: 30,
                right: 30,
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