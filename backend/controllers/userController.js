import { PrismaClient } from "@prisma/client"
import axios from 'axios'
/* import { result } from "../index"; */

const prisma = new PrismaClient();

export const getSavedmetrics = async (req, res) => {
    try {
        const metrics = await prisma.user_saved_metrics.findMany();

        res.status(200).json({metrics})

    } catch (error) {
        console.log(error)
    }
}

export const addMetric = async (req, res) => {
    try {
        const {name, value, value2, type} = req.body
        const addedMetric = await prisma.user_saved_metrics.create({
            data:{
                metric_name: name,
                value: value,
                value2: value2 || '',
                type: type || ''
            }

        });

        res.status(201).json(addedMetric);
    } catch (error) {
        console.log(error)
    }
}

export const deleteMetric = async (req, res) => {
    try {
        const {id} = req.params
        const existingMetric = await prisma.user_saved_metrics.findUnique({
            where: { id: parseInt(id) }, // Assuming 'id' is an integer
          });
      
          if (!existingMetric) {
            return res.status(404).json({ message: 'Metric not found' });
          }
      
          // Delete the metric
          const deletedMetric = await prisma.user_saved_metrics.delete({
            where: { id: parseInt(id) },
          });
      
          res.status(200).json(deletedMetric);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal server error' });
        }
}

export const getAllMetrics = async (req, res) => {
    try {
        const metrics = await prisma.user_saved_metrics.findMany();
        console.log(metrics);
       
        const response = await axios.get('https://api.xero.com/api.xro/2.0/Reports/ExecutiveSummary', {
                headers: {
                    'Authorization': `Bearer ${req.session.accessToken}`,
                    'xero-tenant-id': `${req.session.xeroTenantId}`
                }
            });
    
            console.log('the response is: ', response)
    
            if(response){
                console.log('SUCCESS');
            }
          
    
      



        res.status(200).json(metrics,response)

    } catch (error) {
        console.log(error)
    }
}