import React from 'react'
import Table from '../components/table/Table'
import { Card, CardContent } from '@material-ui/core';

function RightContainer({ tableData }) {
    return (
        <Card className="app__rightContainer">
        <CardContent >
            <h2 style={{alignItems: "center"}}>Live cases by country</h2>
            <Table countries={tableData} />
        </CardContent>
      </Card>
    )
}

export default RightContainer
