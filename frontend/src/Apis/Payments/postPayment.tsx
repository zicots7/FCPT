import React from 'react'
import type { Payment } from '../../Types/Types'
import api from '../Interceptor/Axios';

export default async function postPayment(payment:Payment):Promise<Payment> {
    const response=await api.post(`/payment/admin/create`,payment);
  return response.data;
}
