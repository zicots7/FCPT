import type { LoginRequest, LoginResponse } from "../../Types/Types";
import api from "../Axios";



export const Login = async(
    data:LoginRequest
)=>{

    const response =
        await api.post<LoginResponse>(
            "/auth/login",
            data
        );
  if (response && response.data) {
    localStorage.setItem("token", response.data.token);
    
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: response.data.id,
        username: response.data.username,
        role: response.data.role,
      })
    );

    return response.data;
  }
  throw new Error("No response data available from backend.");

};


