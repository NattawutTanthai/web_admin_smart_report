import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// Day.js
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import buddhistEra from 'dayjs/plugin/buddhistEra';
import relativeTime from 'dayjs/plugin/relativeTime';
import Axios from '../../constants/axiosConfig';
import { Backdrop, CircularProgress } from '@mui/material';
dayjs.locale('th');
dayjs.extend(buddhistEra);
dayjs.extend(relativeTime);

function Row(props) {
    const { task } = props;
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const handleDelete = () => {
        let text = "คุณแน่ใจว่าคุณต้องการจะลบข้อมูล?";
        console.log("delete", task._id);
        if (confirm(text) == true) {
            setLoading(true);
            Axios.delete(`/task/${task._id}`)
                .then(
                    () => {
                        setLoading(false);
                        alert("ลบเสร็จสิ้นแล้ว!!!");
                        window.location.reload();
                    }
                )
        }

    }

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} >
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell align="left">{task.detail}</TableCell>
                <TableCell align="center">{task.phone}</TableCell>
                <TableCell align="center">{task.startDate_timeStamp}</TableCell>
                <TableCell align="right">{task.type}</TableCell>
                <TableCell>
                    <Button onClick={handleDelete} variant="outlined" color='error' startIcon={<DeleteIcon color='error' />}>
                        ลบ
                    </Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Box component="div" className='flex flex-row'>
                                <Box component="div" className='flex-none mx-7 flex justify-center '>
                                    <img className='object-cover h-48 w-48 bg-gray-500 rounded-lg border-4' src={task.imgStart} alt="" />
                                </Box>
                                <Box component="div" className='flex-1 '>
                                    <Typography variant="h6" gutterBottom component="div">
                                        <b>รายละเอียดปัญหา</b>
                                    </Typography>
                                    <Typography variant="h7" gutterBottom component="div">
                                        รายละเอียด  : {task.detail}
                                    </Typography>
                                    <Box component="div" className='flex flex-col'>
                                        <Typography variant="h7" gutterBottom component="div">
                                            ขื่อผู้แจ้ง : {task.name}
                                        </Typography>

                                        <Typography variant="h7" gutterBottom component="div">
                                            ประเภท : {task.type}
                                        </Typography>

                                        <Typography variant="h7" gutterBottom component="div">
                                            เบอร์ติตต่อ : {task.phone}
                                        </Typography>
                                        <Typography variant="h7" gutterBottom component="div">
                                            ที่อยู่ : {task.address}
                                        </Typography>
                                    </Box>

                                    <Typography variant="h7" gutterBottom component="div">
                                        วันที่แจ้ง : {dayjs
                                            .unix(task.startDate_timeStamp)
                                            .format('D MMM BBBB เวลา HH:mm น.')}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>

            {/* warning */}
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
}

export default function TableDropDown({ data }) {

    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell align="left">รายละเอียดปัญหา</TableCell>
                            <TableCell align="center">เบอร์ติดต่อ</TableCell>
                            <TableCell align="center">เวลารับเรื่อง</TableCell>
                            <TableCell align="right">ประเภท</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((data) => (
                            <Row key={data._id} task={data} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}