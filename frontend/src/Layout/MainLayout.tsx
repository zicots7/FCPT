import React from "react";
import { useAuth } from "../Apis/Auth/AuthContextProvider";
import  Navbar  from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";



export default function MainLayout(){

    const { user, loading } = useAuth();


    if(loading){
        return <div>Loading...</div>;
    }


    return (
        <>
   <div className="d-flex flex-column min-vh-100 mt-4 py-3">
  <Navbar user={user ?? undefined} />

  <main className="flex-grow-1">
    <Outlet />
  </main>

  <Footer user={user ?? undefined} />
</div>
        </>
    );
}