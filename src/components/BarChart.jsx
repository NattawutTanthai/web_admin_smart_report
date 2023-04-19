import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Axios from '../../constants/axiosConfig';

export default function BarChart() {
    // const labels = [];
    const [labels, setLabels] = useState([]);
    const [dataType, setDataType] = useState([]);

    useEffect(() => {
        getType();
        console.log('i fire once');
    }, []);

    const getType = async () => {
        await Axios.get('/task/count/type')
            .then((res) => {
                res.data.map((item) => {
                    setLabels((labels) => [...labels, item._id]);
                    setDataType((dataType) => [...dataType, item.count]);
                });
                console.log(labels);
            })
            .catch((err) => {
                console.log("error : " + err);
            });
    };

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'ปัญหาของแต่ละประเภท',
            },
        },
    };

    const data = {
        labels,
        datasets: [
            {
                label: 'จำนวนปัญหา',
                data: dataType,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };
    return <Bar options={options} data={data} />;
}
