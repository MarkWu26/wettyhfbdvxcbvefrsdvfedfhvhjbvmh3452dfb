import React, { useEffect, useState } from 'react'
import {ResponsiveRadar} from '@nivo/radar'
import data from '../../data/data'
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000'

const RadarChart = () => {
  const customColors = {
    'SME A': 'black', // Customize color for 'SME A'
    Benchmark: 'green', // Customize color for 'Benchmark'
  };
  const customBorder = ({ key }) => (key === 'SME A' ? '2px dotted black' : '');
 
  const [metrics, setMetrics] = useState(null);

  useEffect(()=>{
    const fetchMetrics = async () =>{
      try {
        const response = await axios.get('/metrics');
        console.log('the result is: ', response.data)
        setMetrics(response.data);
      } catch (error) {
        console.log(error)
      }
    }

    fetchMetrics();
  }, [])

  

  console.log(metrics)

   const customDotSize = ({ key }) => (key === 'Benchmark' ? 0 : 10);
  const customDotColor = ({ key }) => (key === 'Benchmark' ? 'transparent' : { theme: 'background' });
  

  return (
    <>
    {metrics && (
      <ResponsiveRadar
    data={metrics}
    keys={['SME A', 'Benchmark']}
    indexBy="type"
    margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
    borderColor={{ from: 'color' }}
    gridLabelOffset={36}
    dotSize={10}
    dotColor={{ theme: 'background' }}
    dotBorderWidth={2}
    blendMode="multiply"
    motionConfig="wobbly"
    fillOpacity={0}
    colors={({ key }) => customColors[key] || 'gray'} 
     borderWidth={({ key }) => (key === 'SME A' ? '2px dotted black' : '')}
/>
    )}
    
</>
  )
}

export default RadarChart