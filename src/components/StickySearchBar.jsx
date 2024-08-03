import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SearchContext } from '../Infographics';

const StickySearchBar = () => {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 120) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  }

  return (
    <div className={`flex z-50 ${isScrolled ? 'fixed w-96 right-0 top-3' : 'w-full'} transition-all duration-300`}>
      <form
        className={`bg-sky-100 w-4/5 m-auto bg-opacity-75 backdrop-blur-sm p-2 rounded-full transition-all duration-300 ${isScrolled ? 'top-20' : 'top-[5.5rem]'
          } flex items-center space-x-2`}
        style={{ boxShadow: "inset 0em 0em 0.2em 0 rgba(255,255,255,0.5), inset 0em 0em 0.2em 0 rgba(0,0,0,0.5)" }}
        onSubmit={(e) => { e.preventDefault(); navigate("/infographics/search") }}
      >
        <input
          type="text"
          className="border-none outline-none p-2 rounded-l-full w-full bg-transparent text-black"
          placeholder="Search..."
          onChange={handleSearch}
          value={searchTerm}
        />
        <button className="p-2 bg-primary text-white rounded-full hover:bg-blue-600 transition duration-300" type='submit'>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default StickySearchBar;
