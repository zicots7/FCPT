import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";
import type { User } from "../../Types/Types";
import  Logout  from "../logout/Logout";

interface AuthContextType{

    user:User| null;

    loading:boolean;

    isAuthenticated:boolean;

    refreshUser:()=>Promise<void>;

    logoutUser:()=>void;
}

const AuthContext =
createContext<AuthContextType>(null!);

export const AuthProvider = ({
    children
}:{
    children:React.ReactNode
})=>{

    const [user,setUser] =
    useState<User|null>(null);

    const [loading,setLoading] =
    useState(true);

    const refreshUser = async()=>{

        const token =
            localStorage.getItem("token");


        const savedUser =
            localStorage.getItem("user");


        console.log("TOKEN:", token);
        console.log("USER:", savedUser);



        if(token && savedUser){

            setUser(
                JSON.parse(savedUser)
            );

        }
        else{

            setUser(null);

        }


        setLoading(false);

    };


    useEffect(()=>{

        refreshUser();

    },[]);

    const logoutUser=()=>{

        Logout();

        setUser(null);

    };

    return(

        <AuthContext.Provider
            value={{
                user,
                loading,
                isAuthenticated:!!user,
                refreshUser,
                logoutUser
            }}
        >

            {children}

        </AuthContext.Provider>

    );
};

export const useAuth=()=>useContext(AuthContext);