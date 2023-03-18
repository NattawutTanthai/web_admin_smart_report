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
dayjs.locale('th');
dayjs.extend(buddhistEra);
dayjs.extend(relativeTime);

function Row(props) {
    const { task } = props;
    const [open, setOpen] = React.useState(false);

    const handleDelete = () => {
        console.log("delete", task._id);
        Axios.delete(`/task/${task._id}`)
            .then(
                () => {
                    alert("ลบเสร็จสิ้นแล้ว!!!");
                    window.location.reload();
                }
            )
    }

    return (
        <React.Fragment>
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
                            <Typography variant="h6" gutterBottom component="div">
                                รายละเอียดปัญหา
                            </Typography>
                            <Typography variant="h7" gutterBottom component="div">
                                ขื่อผู้แจ้ง : {task.name}
                            </Typography>
                            <Typography variant="h7" gutterBottom component="div">
                                รายละเอียด : {task.detail}
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
                            <Typography variant="h7" gutterBottom component="div">
                                วันที่แจ้ง : {dayjs
                                    .unix(task.startDate_timeStamp)
                                    .format('D MMM BBBB เวลา HH:mm น.')}
                            </Typography>
                            <img src={task.imgStart} alt="" width={200} height={200} />
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
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