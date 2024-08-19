import { Title, Text, TabList, Tab, ColGrid, Card, Block } from '@tremor/react'
import React, { useState } from 'react'
import CardGridMap from './CardGridMap'
import ChartDonut from './ChartDonut'
import TableBase from './TableBase'
import ButtonCort from './ButtonCort'

const DashboardBase = () => {
    const [selectedView, setSelectedView] = useState(1)

  return (
    <main className='bg-slate-200 p-6 sm:p-10'>
        
        <Title>Habitacion de Hospital</Title>
        

        { selectedView === 1 ? (
            <>
                     
            <ButtonCort/>
            <Block marginTop='mt-6'>
                <ChartDonut />
            </Block>
            </>
        ) : (
            <>
            <Block marginTop='mt-6'>
                <TableBase />
            </Block>
            </>
        )

        }


    </main>
  )
}

export default DashboardBase