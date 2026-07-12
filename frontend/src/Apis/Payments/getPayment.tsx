import React from 'react'
import type { Payment } from '../../Types/Types'
import api from '../Interceptor/Axios';

export default async function getPayment(pid:number):Promise<Payment[]>{
 const response = await api.get(`/payment/id/${pid}`);
    return response.data;
}
