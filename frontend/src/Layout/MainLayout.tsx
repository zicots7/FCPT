import React from "react";
import { useAuth } from "../Apis/Auth/AuthContextProvider";
import  Navbar  from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";



export default function MainLayout(){

    const { user, loading } = useAuth();


    if(loading){
        return <div>Loading...</div>;
    }


    return (
        <>
            <Navbar user={user ?? undefined}/>

            <div className="pt-5">
                <Outlet />
            </div>
        </>
    );
}