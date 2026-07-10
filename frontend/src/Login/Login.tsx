import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Apis/Auth/AuthContextProvider";
import { Login } from "../Apis/login/Login";

export default function LoginPage() {

    const navigate = useNavigate();

    const { refreshUser } = useAuth();


    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");


    const handleLogin = async(e:React.FormEvent)=>{

        e.preventDefault();

        try {

            await Login({
                username,
                password
            });


            // load user details after storing token
            await refreshUser();


            // redirect
            navigate("/dashboard");


        } catch(error){

            console.log("Login failed", error);

        }

    };
    

    return (
        <div className="container mt-5">

    <div className="container mt-5">
    <div className="row justify-content-center">
        <div className="col-md-5 col-lg-4">
            <div className="card shadow-sm border-0">
                <div className="card-body p-4 p-md-5">
                    <h2 className="text-center mb-4 fw-bold">Login</h2>

                    <form onSubmit={handleLogin}>
                         <input
                    className="form-control mb-3"
                    placeholder="Username"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                />

                <input
                    className="form-control mb-3"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />

                        <div className="d-grid gap-2 mt-4">
                            <button id="submit" className="btn btn-primary btn-lg" type="submit">
                                Login
                            </button>
                        </div>
                    </form>

                </div>
                  <div className="d-grid gap-2">
                        <a href="{% url 'demo_login' 'admin' %}"
                           className="btn btn-outline-primary">
                            Demo as Admin
                        </a>

                    </div>

            </div>
        </div>
    </div>
</div>

        </div>
 
    );
}