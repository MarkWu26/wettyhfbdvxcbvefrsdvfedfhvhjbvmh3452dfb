import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const getMetrics = async (req, res) => {
    try {
        const allMetrics = await prisma.radar_chart.findMany();
        console.log(allMetrics);

        
        const keysToSkip = ["metrics_id", "entity"];
        const types = Object.keys(allMetrics[0]).filter(key => !keysToSkip.includes(key));

        const outputArray = types.map(type => {
            const typeObject = {
              type: type.replace(/_/g, ' '),
            };
          
            allMetrics.forEach(entity => {
              typeObject[entity.entity] = entity[type].toString();
            });
          
            return typeObject;
          });

        console.log('the result is: ', outputArray)

 
        res.status(200).json(outputArray)
    } catch (error) {
        console.log('Error geting metrics: ', error);
    }
  
}

export const getMetricNames = async (req, res) => {
    try {
       const metricNames = await prisma.metric.findMany();
        console.log(metricNames)
       
        res.status(200).json(metricNames);
    } catch (error) {
        console.log(error)
    }
    
}