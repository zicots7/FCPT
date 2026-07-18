import api from "../Interceptor/Axios"


export default async function getInvoice(pid:number){
    const response= await api.get(`/download-invoice/${pid}`,{
         responseType: "blob",
    });
  const url = window.URL.createObjectURL(response.data);

  const a = document.createElement("a");
  a.href = url;
  a.download = `invoice-${pid}.pdf`; // or whatever filename you want
  a.click();

  window.URL.revokeObjectURL(url);
  return response.data;
}
