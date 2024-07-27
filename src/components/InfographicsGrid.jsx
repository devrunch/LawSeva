/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Card from './Card';
import arrow2 from '../assets/info/arrow2.svg';
const Infographics = ({category,count}) => {
  const [infographics, setInfographics] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = count || 8; // Number of items per page

  useEffect(() => {
    fetchInfographics(currentPage);
  }, [currentPage]);

  const fetchInfographics = async (page) => {
    try {
      const response = await fetch(`https://utility.caclouddesk.com/infographics/search?description=&tag=${category||''}&page=${page}&limit=${limit}`);
      const data = await response.json();
      setInfographics(data.infographics); // Assuming API returns infographics in a `infographics` field
      setTotalPages(data.totalPages); // Assuming API returns total pages in a `totalPages` field
    } catch (error) {
      console.error('Error fetching infographics:', error);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


  return (
    <div className="container mx-auto p-4">
      {/* <h1 className="text-2xl font-bold mb-4">Infographics</h1> */}
      <div className="w-5/6 m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {infographics.map((infographic) => (
          <Card
            key={infographic._id}
            ids={infographic._id}
            imageUrl={`https://utility.caclouddesk.com/uploads/footer-${infographic.image}`}
            downloads={infographic.downloads || '0'}
            tags={infographic.tags[0] || ['General']}
            description={infographic.description}
            title={infographic.title}
          />
        ))}
      </div>
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded `}
        >
          <img src={arrow2} alt="" className={`w-8 rotate-180 ${currentPage === 1 ? 'saturate-0' : ''}`} />
        </button>
        <span className="text-sm font-ubuntu text-paragraph">{`Page ${currentPage}/${totalPages}`}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded`}
        >
          <img src={arrow2} alt="" className={`w-8 ${currentPage === totalPages ? 'saturate-0' : ''}`}/>
        </button>
      </div>
    </div>
  );
};

export default Infographics;
