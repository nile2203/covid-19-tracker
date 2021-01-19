import React from 'react'
import { Line } from 'react-chartjs-2'
import numeral from 'numeral'

const options = {
    legend: {
        display: false
    },
    elements: {
        points: {
            radius: 0,
        }
    },
    maintainAspectRatio: true,
    responsive: true,
    animation: {
        tension: {
            duration: 1000,
            easing: 'easeInBack',
            from: 1,
            to: 0,
            loop: true
        }
    },
    tooltip: {
        intersect: false,
        mode: "index",
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0.0")
            }
        }
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll"
                }
            }
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                tricks: {
                    callback: function(value, index, values) {
                        return numeral(value).format("0a")
                    }
                },
                stacked: true,
            }
        ]
    }
};

function LineGraph({ data, caseType="cases" }) {
    const transformData = () => {
        const finalData = []
        let newData = {}
        if (data.timeline) {
            newData = {...data.timeline}
        }
        else {
            newData = {...data}
        }
        if (newData[caseType]) {
            for (const [date, value] of Object.entries(newData[caseType])) {
                finalData.push({
                    x: date,
                    y: value
                })
            }
        }
        return finalData

    }

    return (
        <Line 
            data={{
                datasets: [
                    {
                        data: transformData(),
                        backgroundColor: "#ffe6ff",
                        borderColor: "#cc00cc",
                        borderWidth: 2,
                        pointBackgroundColor: "#cc00cc",
                        pointBorderColor: "#ffffff",
                        pointBorderWidth: 0,
                        showLine: false
                    },
                ],
            }}
            options={options}
        />
    )
}

export default LineGraph
