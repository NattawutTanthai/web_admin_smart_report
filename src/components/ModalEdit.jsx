import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Axios from "../../constants/axiosConfig";


export default function ModalEdit({ emp }) {

  const [open, setOpen] = useState(false);
  const [types, setTypes] = useState([]);

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

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={...styleModal}>
        <div className='space-y-5'>
          <Typography gutterBottom variant='h5'>แก้ไขรายชื่อ</Typography>
          <TextField fullWidth label="ชื่อ" defaultValue={emp.fname} variant="outlined" color="warning" />
          <TextField fullWidth label="นามสกุล" defaultValue={emp.lname} variant="outlined" color="warning" />
          <TextField fullWidth label="เบอร์ติดต่อ" defaultValue={emp.phone} variant="outlined" color="warning" />
          <TextField fullWidth label="Username" defaultValue={emp.username} variant="outlined" color="warning" />
          <TextField
            fullWidth
            select
            label="ประเภท"
            defaultValue={emp.type}
            SelectProps={{
              native: true,
            }}
          >
            {types.map((type) => (
              <option key={type._id} value={type.name}>
                {type.name}
              </option>
            ))}
          </TextField>
          <div className='flex flex-row space-x-2 justify-center'>
            <Button variant="contained" color='success' fullWidth>บันทึก</Button>
            <Button variant="contained" color='error' fullWidth onClick={handleClose}>ยกเลิก</Button>
          </div>
        </div>
      </Box>
    </Modal>
  )
}