import React from 'react'
import { Chart } from "react-google-charts";

const MyPieChart = () => {
    const data = [
        ["Task", "Hours per Day"],
        [" Branding and Marketing", 7],
        [" Gift Code Invemtory", 22],
        ["Legal & Financial Overhead", 28],
        ["IT Infastructure", 11],
        ["Bounty &Overhead", 9],
        ["Management", 3],
        ["Bounty", 5],
    ];

    const options = {
        is3D: true,
    };
    return (
        <>
            <Chart
                chartType="PieChart"
                data={data}
                options={options}
                width={"100%"}
                height={"600px"}
            />
        </>
    )
}

export default MyPieChart