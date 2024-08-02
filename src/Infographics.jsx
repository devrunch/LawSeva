import { Route } from 'react-router-dom'
import Home from './pages/Home';
import InfographicsDownloadPage from './pages/InfographicsDownloadPage';
import SearchPage from './pages/SearchResult';
import { Routes } from 'react-router-dom';
import StickySearchBar from './components/StickySearchBar';
const Infographics = () => {
    return (
        <>
            <StickySearchBar/>
            <Routes>
                <Route path="" element={<Home />} />
                <Route path="search" element={<SearchPage />} />
            </Routes>
        </>
    )
}

export default Infographics
