import { BrowserRouter, Routes, Route } from "react-router-dom"
import GstCalculator from "./pages/GstCalculator"
import GstDetails from "./pages/GstDetails"
import FillingInfo from './pages/FillingInfo'
import Navbar from "./components/Navbar"
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import ConfirmDialog from "./components/Navbar/ConfirmDialog"
function App() {


  return (
    <>
    <ToastContainer/>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/taxpayersearch" element={<GstDetails />} />
          <Route path="/gstcalculator" element={<GstCalculator />} />
          <Route path="/filinginfo" element={<FillingInfo />} />
          <Route path="/" element={<GstCalculator />} />
          <Route path="/test" element={<ConfirmDialog />} />
       
        </Routes>
   
      </BrowserRouter>
    </>
  )
}

export default App
