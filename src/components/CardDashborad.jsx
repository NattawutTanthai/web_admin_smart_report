import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import Axios from '../../constants/axiosConfig';

// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
// }));

export default function CardDashborad() {
    const [waitReport, setWaitReport] = useState(null);
    const [process, setProcess] = useState(null);
    const [success, setSuccess] = useState(null);

    const getWaitReport = async () => {
        await Axios.get('waitReport/count')
            .then((res) => {
                setWaitReport(res.data[0].count);
            })
            .catch((err) => {
                console.log("waitReport" + err);
            });
    }
    const getProcess = async () => {
        await Axios.get('process/count')
            .then((res) => {
                setProcess(res.data[0].count);
            })
            .catch((err) => {
                console.log("process" + err);
            });
    }
    const getSuccess = async () => {
        await Axios.get('success/count')
            .then((res) => {
                setSuccess(res.data[0].count);
            })
            .catch((err) => {
                console.log("success" + err);
            });
    }

    useEffect(() => { //getdata
        getWaitReport();
        getProcess();
        getSuccess();
    }, []);

    return (
        <>
            <Box sx={{ width: '100%' }}>
                {/* <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}> */}
                {/* <Grid item xs={6}> */}
                {/* <Item sx={{ backgroundColor: '#FFD457' }}> */}

                <Typography gutterBottom variant="h5" component="div">
                    <b>รอรับเรื่อง</b>
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    ทั้งหมด {waitReport ?? "0"} รายการ
                </Typography>
                {/* </Item> */}
                {/* </Grid> */}
                {/* <Grid item xs={6}> */}
                {/* <Item sx={{ backgroundColor: '#79AFFF' }}> */}
                <Typography gutterBottom variant="h5" component="div">
                    <b>ดำเนินการ</b>
                </Typography>
                <Typography variant="h6" color="text.danger">
                    ทั้งหมด {process ?? "0"} รายการ
                </Typography>
                {/* </Item> */}
                {/* </Grid> */}
                {/* <Grid item xs={6}> */}
                {/* <Item sx={{ backgroundColor: '#8AFF88' }}> */}
                <Typography gutterBottom variant="h5" component="div">
                    <b>เสร็จสิ้น</b>
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    ทั้งหมด {success ?? "0"} รายการ
                </Typography>
                {/* </Item> */}
                {/* </Grid> */}
                {/* <Grid item xs={6}> */}
                {/* <Item sx={{ backgroundColor: '#FF8585' }}> */}
                <Typography gutterBottom variant="h5" component="div">
                    <b>ส่งต่อ</b>
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    ทั้งหมด 65 รายการ
                </Typography>
                {/* </Item> */}
                {/* </Grid> */}
                {/* </Grid> */}
            </Box>
        </>
    );
}