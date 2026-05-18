import { Navigate,Routes,Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProblemsPage from "./pages/ProblemsPage"
import DashboardPage from "./pages/DashboardPage";
import { Toaster } from "react-hot-toast" 

import "./App.css"
import {
  useUser,
  SignInButton,
  SignOutButton,
  UserButton
} from "@clerk/clerk-react";

function App() {
  const { isLoaded, isSignedIn } = useUser();

  // wait for Clerk to load and will get rid of flickering effect
  if (!isLoaded) return <p>Loading...</p>;

  return (
    <>
    <Routes>

      <Route path="/" element={!isSignedIn ? <HomePage/> : <Navigate to={"/dashboard"} />} />
      <Route path="/dashboard" element={isSignedIn ? <DashboardPage/> : <Navigate to={"/"} />} />
   
      <Route path="/problems" element={isSignedIn ? <ProblemsPage/> : <Navigate to={"/"} />}/>

    </Routes>

    <Toaster position="" toastOptions={{duration:3000}}></Toaster>
   </>
  );
}

export default App;