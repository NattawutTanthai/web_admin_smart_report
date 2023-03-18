import AddIcon from '@mui/icons-material/Add';
import { green } from "@mui/material/colors";
import { Fab } from "@mui/material";


function FloatingActionButton() {
  return (
    <>
        <Fab sx={{
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
    </>
  )
}

export default FloatingActionButton