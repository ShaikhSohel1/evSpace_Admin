import React from 'react'
import ChartData from './component/ChartData'
import SideBar from './component/SideBar'

export default function chart() {
  return (
    <div className='grid grid-cols-5 gap-0 bg-slate-800'>
    <SideBar />


<div className='col-span-4'>
    <ChartData />
    </div>


  </div>
  )
}
