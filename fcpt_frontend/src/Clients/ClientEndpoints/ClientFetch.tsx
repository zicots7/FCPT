import { Client } from "../Types";
import axios from "axios"

export async function ClientFetch(): Promise<Client[]> {
  const response = await axios.get<Client[]>("https://localhost:8080/FCPT/clients/all", {
  });
  return response.data;
}