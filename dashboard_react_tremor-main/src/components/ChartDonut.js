import React from 'react'
import { Card, DonutChart, Title } from '@tremor/react'

const temperature = [
    {
        name: 'Temperatura',
        sales: 35
    },
    
]

const ChartDonut = () => {
  return (
    <Card>
        <Title>Temperatura Actual</Title>
        <DonutChart 
            data={temperature}
            category='sales'
            dataKey='name'
            marginTop='mt-6'
            colors={["yellow", "violet", "indigo", "rose", "cyan", "green"]}
        />
    </Card>
  )
}

export default ChartDonut