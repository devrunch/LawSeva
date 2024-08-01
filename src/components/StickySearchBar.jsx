import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const StickySearchBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/infographics/search?q=${e.target.value}`);
    // window.location.href = `infographics/search?q=${e.target.value}`;
    console.log(e.target.value);
  }

  return (
    <div className={`w-full fixed flex z-50 ${isScrolled ? 'justify-end' : 'justify-center'} transition-all duration-300`}>
      <div
        className={`fixed transform z-50 bg-white p-2 rounded-full shadow-md transition-all duration-300 ${
          isScrolled ? 'w-auto mr-4 top-5' : 'top-[5.5rem] w-1/3'
        } flex items-center space-x-2`}
      >
        <input
          type="text"
          className="border-none outline-none p-2 rounded-l-full w-full"
          placeholder="Search..."
          onChange={handleSearch}
        />
        <button className="p-2 bg-primary text-white rounded-full hover:bg-blue-600 transition duration-300">
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
      </div>
    </div>
  );
};

export default StickySearchBar;
