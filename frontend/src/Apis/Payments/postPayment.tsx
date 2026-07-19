import React from 'react'
import type { CreatePayment, Payment } from '../../Types/Types'
import api from '../Interceptor/Axios';

export default async function postPayment(payment:CreatePayment){
    const response=await api.post(`/payment/admin/create`,payment);
  return response.data;
}
