
import type { CreatePayment, Payment } from '../../Types/Types'
import api from '../Interceptor/Axios'

export default async function putPayment(id:number,payment:CreatePayment):Promise<Payment>{
    const response=await api.put(`/payment/admin/update/${id}`,payment);
  return response.data;
}
