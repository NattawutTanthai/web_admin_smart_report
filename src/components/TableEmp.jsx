import * as React from 'react';
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
import Axios from '../../constants/axiosConfig';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

export default function TableEmp({ data }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);

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

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = (id) => {
    console.log("delete", id);
    Axios.delete(`/employee/${id}`)
      .then(
        () => {
          alert("ลบเสร็จสิ้นแล้ว!!!");
          window.location.reload();
        }
      )
  }

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left">ชื่อ</TableCell>
                <TableCell align="center">เบอร์ติดต่อ</TableCell>
                <TableCell align="center">Username</TableCell>
                <TableCell align="center">ประเภท</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((emp) => (
                <>
                  <TableRow
                    key={emp._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="left">{emp.fname} {emp.lname}</TableCell>
                    <TableCell align="center">{emp.phone}</TableCell>
                    <TableCell align="center">{emp.username}</TableCell>
                    <TableCell align="center">{emp.type}</TableCell>
                    <TableCell align="right">
                      <Button onClick={() => handleDelete(emp._id)} variant="outlined" color='error' startIcon={<DeleteIcon color='error' />}>
                        ลบ
                      </Button>{" "}
                      <Button onClick={handleOpen} variant="outlined" color='warning' startIcon={<CreateIcon color='warning' />}>
                        แก้ไข
                      </Button>
                    </TableCell>
                  </TableRow>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                  >
                    <Box sx={styleModal}>
                      <h2 id="parent-modal-title">Text in a modal</h2>
                      <p id="parent-modal-description">
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                      </p>
                    </Box>
                  </Modal>
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>


    </>
  );
}