import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Backdrop, Box, CircularProgress, Fab, Modal, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { green } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import Axios from '../../constants/axiosConfig';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];

export default function TableType({ data }) {
  const [flagModal, setFlagModal] = useState(true); // true = add, false = edit
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataModal, setDataModal] = useState({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    width: 400
  };

  const getType = () => {
    Axios.get('/type')
      .then(
        (res) => {
          console.log(res.data);
          setTypes(res.data);
        }
      )
  }

  useEffect(() => {
    getType();
  }, []);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEdit = (type) => {
    setFlagModal(false);
    setDataModal(type);
    setType(type.name);
    handleOpen();
  }

  const handleSave = () => {
    setOpen(false)
    setLoading(true);
    console.log("save", type);
    if (flagModal) {
      Axios.post('/type', { name: type })
        .then(
          res => {
            setLoading(false);
            alert("บันทึกเสร็จสิ้น!!!");
            window.location.reload();
          }
        )
    } else {
      Axios.put(`/type/${dataModal._id}`, { name: type })
        .then(
          () => {
            setLoading(false);
            alert("แก้ไขเสร็จสิ้น!!!");
            window.location.reload();
          }
        )
    }

  }

  const handleDelete = (id) => {
    let text = "คุณแน่ใจว่าคุณต้องการจะลบข้อมูล?";
    if (confirm(text) == true) {
      setLoading(true);
      Axios.delete(`/type/${id}`)
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
    setType("");
    handleOpen();
  }

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left">โค๊ด</TableCell>
                <TableCell align="center">ชื่อประเภท</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((type) => (
                <TableRow
                  key={type._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left">{type.code}</TableCell>
                  <TableCell align="center">{type.name}</TableCell>
                  <TableCell align="right">
                    <Button onClick={() => handleDelete(type._id)} variant="outlined" color='error' startIcon={<DeleteIcon color='error' />}>
                      ลบ
                    </Button>{" "}
                    <Button onClick={() => handleEdit(type)} variant="outlined" color='warning' startIcon={<CreateIcon color='warning' />}>
                      แก้ไข
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
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
            <TextField fullWidth label="ประเภท" defaultValue={type} onChange={(e) => setType(e.target.value)} variant="outlined" color="warning" />
            <div className='flex flex-row space-x-2 justify-center'>
              <Button variant="contained" color='success' fullWidth onClick={() => handleSave()}>บันทึก</Button>
              <Button variant="contained" color='error' fullWidth onClick={handleClose}>ยกเลิก</Button>
            </div>
          </div>
        </Box>
      </Modal>

      <Fab onClick={() => handleAdd()} sx={{
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

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}