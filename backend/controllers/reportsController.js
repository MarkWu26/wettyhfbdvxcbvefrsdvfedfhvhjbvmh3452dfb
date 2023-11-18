import axios from 'axios'

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()


export const getExecutiveSummary = async (req, res) => {
    try {
        const response = axios.get('https://api.xero.com/api.xro/2.0/Reports/ExecutiveSummary', {
            headers: {
                'Authorization': `Bearer ${req.session.accessToken}`,
                'xero-tenant-id': `${req.session.xeroTenantId}`
            }
        });

        console.log('the response is: ', response)

        if(response){
            console.log('SUCCESS');
        }
      

        res.status(200).json(response);
    } catch (error) {
        console.log(error)
    }
    
}

