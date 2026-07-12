import React from 'react'
import type { Payment } from '../../Types/Types'
import api from '../Interceptor/Axios'

export default async function putPayment(id:number,payment:Payment):Promise<Payment>{
    const response=await api.put(`/payment/admin/update/${id}`,payment);
  return response.data;
}
