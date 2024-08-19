import { BadgeDelta, Block, Card, ColGrid, Flex, Metric, ProgressBar, Text } from '@tremor/react'
import React, { useEffect, useState } from 'react'
import Range from './Range';

const data = [
    {
        title: 'Sales',
        metric: '$ 12,699',
        progress: 15.9,
        target: '$ 80,000',
        delta: '13.2%',
        deltaType: 'moderateIncrease',
    },
    {
        title: 'Profit',
        metric: '$ 45,564',
        progress: 36.5,
        target: '$ 125,000',
        delta: '23.9%',
        deltaType: 'increase',
    },
    
]


const CardGridMap = () => {

   
    
  return (
    <ColGrid numColsMd={2} numColsLg={2} marginTop="mt-6" gapX='gap-x-6' gapY='gap-y-6' >
        { data.map( (item) => (
            <Card key={item.title}>
                 Control Puerta
                 <Range/>
            </Card>    
        )) }
    </ColGrid>
  )
}

export default CardGridMap