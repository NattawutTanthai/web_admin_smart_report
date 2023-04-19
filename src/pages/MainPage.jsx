import React, { useState, useEffect } from 'react'
import CardDashborad from '../components/CardDashborad'
import ChartDoughnut from '../components/ChartDoughnut'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Axios from '../../constants/axiosConfig';
import BarChart from '../components/BarChart';
import { Backdrop, CircularProgress } from '@mui/material';


export default function MainPage() {
  const [loading, setLoading] = useState(false);
  const [waitReport, setWaitReport] = useState(null);
  const [process, setProcess] = useState(null);
  const [success, setSuccess] = useState(null);
  const [sentTo, setSentTo] = useState(null);

  const getWaitReport = async () => {
    setLoading(true);
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

  const getSentTo = async () => {
    await Axios.get('sentTo/count')
      .then((res) => {
        setSentTo(res.data);
      })
      .catch((err) => {
        console.log("success" + err);
      });
    setLoading(false);
  }

  useEffect(() => {
    getWaitReport();
    getProcess();
    getSuccess();
    getSentTo();
  }, []);

  return (
    <>
      <CardDashborad waitReport={waitReport} process={process} success={success} sentTo={sentTo} />
      <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <ChartDoughnut waitReport={waitReport} process={process} success={success} sentTo={sentTo} />
          </Grid>
          <Grid item xs={6}>
            <BarChart />
          </Grid>
        </Grid>
      </Box>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

    </>
  )
}
