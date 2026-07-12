import api from "../Interceptor/Axios";


export default async function deletePayment(id:number){
    return (
    await api.delete(`/payment/admin/delete/${id}`));
}
