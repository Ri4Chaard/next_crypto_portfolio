import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface MarketChart {
    prices: any;
    token: any;
}

export const MarketChart = ({ prices, token }: MarketChart) => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: "Chart",
            },
        },
        scales: {
            y: {
                position: "right" as const,
                ticks: {
                    color: "white",
                },
            },
            x: {
                ticks: {
                    color: "white",
                },
            },
        },
    };

    const labels = prices.map((price: number[]) => {
        const date = new Date(price[0]);
        return date.toLocaleDateString("en-GB");
    });

    const data = {
        labels,
        datasets: [
            {
                label: `${token}`,
                data: prices.map((price: number[]) => price[1]),
                borderColor: "rgb(8, 145, 178)",
                backgroundColor: "rgb(8, 145, 178, 0.5)",
            },
        ],
    };
    return <Line options={options} data={data} />;
};
