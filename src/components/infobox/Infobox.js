import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import './Infobox.css'

function Infobox({ title, numberOfCases, totalCases}) {
    return (
        <Card className="infobox">
            <CardContent> 
                <Typography className="infobox__title" color="textSecondary">
                    {title}
                </Typography>
                <h2 className="infobox__cases">
                    {numberOfCases}
                </h2>
                <Typography className="infobox__total" color="textSecondary">
                    {totalCases} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Infobox
