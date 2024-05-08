import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface TokensPieChart {
    tokens: any;
}

export const TokensPieChart = ({ tokens }: TokensPieChart) => {
    const colors: { id: string; color: string; borderColor: string }[] = [
        {
            id: "ethereum",
            color: "#6f749a7a",
            borderColor: "#6f749a",
        },
        {
            id: "tether",
            color: "#0293967a",
            borderColor: "#029396",
        },
        {
            id: "first-digital-usd",
            color: "#ffffff7a",
            borderColor: "#ffffff",
        },
        {
            id: "usd-coin",
            color: "#2475c77a",
            borderColor: "#2475c7",
        },
        {
            id: "binancecoin",
            color: "#ecbb097a",
            borderColor: "#ecbb09",
        },
        {
            id: "pepe",
            color: "#509a457a",
            borderColor: "#509a45",
        },
        {
            id: "shiba-inu",
            color: "#ffa4057a",
            borderColor: "#ffa405",
        },
        {
            id: "chainlink",
            color: "#275cdc7a",
            borderColor: "#275cdc",
        },
        {
            id: "dai",
            color: "#faae1a7a",
            borderColor: "#faae1a",
        },
    ];
    const options = {
        responsive: true,
    };

    const data = {
        labels: tokens.map((token: any) => token.id.toUpperCase()),
        datasets: [
            {
                label: "Balance",
                data: tokens.map((token: any) => token.balanceInUSD),
                backgroundColor: tokens.map(
                    (token: any) =>
                        colors.filter((color: any) => token.id == color.id)[0]
                            .color
                ),
                borderColor: tokens.map(
                    (token: any) =>
                        colors.filter((color: any) => token.id == color.id)[0]
                            .borderColor
                ),
                borderWidth: 1,
            },
        ],
    };
    return <Pie options={options} data={data} />;
};
