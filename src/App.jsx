import { BrowserRouter, Routes, Route } from "react-router-dom"
import GstDetails from "./pages/GstDetails"
import TaxPayer from "./pages/TaxPayer"
import Navbar from "./components/Navbar"


function App() {


  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/gstcalculator" element={<GstDetails />} />
          <Route path="/" element={<GstDetails />} />
          <Route path="/taxpayersearch" element={<TaxPayer />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
