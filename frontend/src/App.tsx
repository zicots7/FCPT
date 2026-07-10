
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./Apis/Auth/ProtectedRoute";
import ClientMain from "./Client/ClientMain";
import LoginPage from "./Login/Login";
import MainLayout from "./Layout/MainLayout";
import Dashboard from "./Dashboard/Dashboard";
import Projects from "./Project/Projects";
import AddClient from "./Client/AddClient";
import EditClient from "./Client/EditClient";


function App() {

  return (

        <Routes>
             
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
    );

  }


export default App;
