import { red } from '@material-ui/core/colors';
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
    maintainAspectRatio: false,
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
                }
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
                        backgroundColor: red,
                        borderColor: "#CC1034",
                    },
                ],
            }}
            options={options}
        />
    )
}

export default LineGraph
