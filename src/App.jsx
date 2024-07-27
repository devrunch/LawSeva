import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import GstCalculator from "./pages/GstCalculator"
import GstDetails from "./pages/GstDetails"
import FillingInfo from './pages/FillingInfo'
import Navbar from "./components/Navbar"
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { useEffect } from "react"
import Home from './pages/Home';
import InfographicsDownloadPage from './pages/InfographicsDownloadPage';
import SearchPage from './pages/SearchResult';
function App() {
  useEffect(() => {
    // Get the current URL
    const url = new URL(window.location.href);
    const queryParams = new URLSearchParams(url.search);
    if (queryParams.has('cacldmail')) {
      const cacldmail = queryParams.get('cacldmail');
      localStorage.setItem('cacldmail', cacldmail);
    }
  }, []);
  function ScrollToTop() {
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [pathname]);
  
    return null;
  }
  return (
    <>
    <ToastContainer/>
      <BrowserRouter>
        <Navbar/>
        <ScrollToTop />
        <Routes>
          <Route path="/taxpayersearch" element={<GstDetails />} />
          <Route path="/gstcalculator" element={<GstCalculator />} />
          <Route path="/filinginfo" element={<FillingInfo />} />
          <Route path="/" element={<GstCalculator />} />
          {/* <Route path="/test" element={<ConfirmDialog />} /> */}
          <Route path="/infographics/" element={<Home />} />
          <Route path="/infographics/search" element={<SearchPage />} />
          <Route path="/infographics/contact" element={<h1>Contact</h1>} />
          <Route path="/infographics/download/:id" element={<InfographicsDownloadPage />} />
       
        </Routes>
   
      </BrowserRouter>
    </>
  )
}

export default App
