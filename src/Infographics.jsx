/* eslint-disable react/prop-types */
import { Route } from 'react-router-dom'
import Home from './pages/Home';
import SearchPage from './pages/SearchResult';
import { Routes } from 'react-router-dom';
import StickySearchBar from './components/StickySearchBar';
import { useState, createContext } from 'react';


export const SearchContext = createContext();
const SearchProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
            {children}
        </SearchContext.Provider>
    );
};




const Infographics = () => {
    return (
        <>
            <SearchProvider>
                {/* <StickySearchBar /> */}
                <Routes>
                    <Route path="" element={<Home />} />
                    <Route path="search" element={<SearchPage />} />
                </Routes>
            </SearchProvider>
        </>
    )
}

export default Infographics