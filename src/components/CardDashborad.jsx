import * as React from 'react';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function CardDashborad() {
    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                        <Item sx={{ backgroundColor: '#FFD457' }}>

                            <Typography gutterBottom variant="h5" component="div">
                                <b>รอรับเรื่อง</b>
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                ทั้งหมด 56 รายการ
                            </Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item sx={{ backgroundColor: '#79AFFF' }}>
                            <Typography gutterBottom variant="h5" component="div">
                            <b>ดำเนินการ</b>
                            </Typography>
                            <Typography variant="h6" color="text.danger">
                                ทั้งหมด 6 รายการ
                            </Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item sx={{ backgroundColor: '#8AFF88' }}>
                            <Typography gutterBottom variant="h5" component="div">
                                <b>เสร็จสิ้น</b>
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                ทั้งหมด 4 รายการ
                            </Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item sx={{ backgroundColor: '#FF8585' }}>
                            <Typography gutterBottom variant="h5" component="div">
                                <b>ส่งต่อ</b>
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                ทั้งหมด 65 รายการ
                            </Typography>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}