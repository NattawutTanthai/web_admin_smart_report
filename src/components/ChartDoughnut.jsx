import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

export default function ChartDoughnut({ waitReport, process, success, sentTo }) {
    ChartJS.register(ArcElement, Tooltip, Legend);
    const data = {
        labels: ['รอการแจ้งเตือน', 'กำลังดำเนินการ', 'สำเร็จ', 'ส่งต่อ'],
        datasets: [
            {
                label: 'จำนวนผู้แจ้งเตือน',
                data: [waitReport, process, success, sentTo],
                backgroundColor: [
                    '#FFDC78',
                    '#6AAAFF',
                    '#7BFFB3',
                    '#FF8B8B',
                ],
                borderColor: [
                    '#FFC726',
                    '#2F80ED',
                    '#27AE60',
                    '#EB5757',
                ],
                borderWidth: 2,
            },
        ],
    };


    return (
        <>
            <Doughnut data={data} className="m-5" />
        </>
    )
}
