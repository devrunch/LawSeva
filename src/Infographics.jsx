import { Route } from 'react-router-dom'
import Home from './pages/Home';
import InfographicsDownloadPage from './pages/InfographicsDownloadPage';
import SearchPage from './pages/SearchResult';
import Admin from './components/Sections/Admin'
import { Routes } from 'react-router-dom';
import StickySearchBar from './components/StickySearchBar';
const Infographics = () => {
    return (
        <>
            <StickySearchBar/>
            <Routes>
                <Route path="12345/admin" element={<Admin />} />
                <Route path="" element={<Home />} />
                <Route path="search" element={<SearchPage />} />
                <Route path="contact" element={<h1>Contact</h1>} />
                <Route path="download/:id" element={<InfographicsDownloadPage />} />
            </Routes>
        </>
    )
}

export default Infographics
