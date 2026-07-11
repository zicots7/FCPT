
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./Apis/Auth/ProtectedRoute";
import ClientMain from "./Client/ClientMain";
import LoginPage from "./Login/Login";
import MainLayout from "./Layout/MainLayout";
import Dashboard from "./Dashboard/Dashboard";
import Projects from "./Project/Projects";
import { Toaster } from "react-hot-toast";



function App() {

  return (
    <>
        <Routes>
             
             <Route
                path="/"
                element={<LoginPage />}
            />
            <Route
                path="/login"
                element={<LoginPage />}
            />
       {/* Protected */}
            <Route
                element={
                    <ProtectedRoute>
                        <MainLayout />
                    </ProtectedRoute>
                }
            >
                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />
                <Route
                    path="/clients"
                    element={<ClientMain />}
                
                />
         
                <Route
                path="/projects"
                element={<Projects/>}
                />
       
            </Route>
        </Routes>
        
           <Toaster
          position="top-right" 
          toastOptions={{
            duration: 4000,
            style: {
              background: '#333',
              color: '#fff',
            },
          }} 
        />
        </>

    );

  }


export default App;
