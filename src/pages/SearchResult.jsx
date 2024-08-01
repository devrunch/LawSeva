import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Card from '../components/Card';
import arrow2 from '../assets/info/arrow2.svg';
import Common from '../components/Sections/Common';

const SearchPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  let tagParam = params.get('tag');
  let queryParam = params.get('q');
  const [infographics, setInfographics] = useState([]);
  const [description, setDescription] = useState(queryParam || '');
  const [tag, setTag] = useState(tagParam || '');
  const [tags, setTags] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchInfographics = async (description, tag, page) => {
    try {
      const response = await fetch(
        `https://utility.caclouddesk.com/api/infographics/search?description=${description}&tag=${tag}&page=${page}&limit=10`
      );
      const data = await response.json();
      
      console.log({description:`https://utility.caclouddesk.com/api/infographics/search?description=${description}&tag=${tag}&page=${page}&limit=10`,data})
      setInfographics(data.infographics);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching infographics:', error);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await fetch('https://utility.caclouddesk.com/api/infographics/tags');
      const data = await response.json();
      setTags(data);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  useEffect(() => {
    fetchInfographics(description, tag, page);
  }, [page]);

  useEffect(() => {
    tagParam = params.get('tag')||'';
    queryParam = params.get('q')||'';
    fetchInfographics(queryParam, tagParam, page);
  }, [location.search]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    history.push(`?description=${description}&tag=${tag}`);
  };

  return (
    <>
      <section className='text-center py-10 space-y-6 mt-5'>
        <h2 className="text-primary font-manrope font-semibold uppercase text-center">Explore Templates</h2>
        <h1 className='text-center text-5xl font-manrope font-bold'>Best Infographics</h1>
        <p className='text-paragraph text-base text-center lg:w-1/2 m-auto'>Browse through our selection of infographic templates designed to meet the specific needs of your work. Each template is crafted to simplify complex information and enhance your communication with clients.</p>
      </section>
      <section className='px-2 lg:px-20 space-y-8'>
        <div className='flex justify-between items-center'>
          <div>
            Showing Page: {page} of {totalPages}
          </div>
          <div>
            <form onSubmit={handleSearch}>
              <div className="relative flex">
                {/* <input
                  type="search"
                  className="relative m-0 block flex-auto rounded border border-solid border-neutral-200 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-surface outline-none transition duration-200 ease-in-out placeholder:text-neutral-500 focus:z-[3] focus:border-primary focus:shadow-inset focus:outline-none motion-reduce:transition-none"
                  placeholder="Search by description"
                  aria-label="Search"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  id="descriptionSearch"
                  aria-describedby="button-addon2"
                  
                /> */}
                <select
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  className="ml-2 relative m-0 block flex-auto rounded border border-solid border-neutral-200 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-surface outline-none transition duration-200 ease-in-out placeholder:text-neutral-500 focus:z-[3] focus:border-primary focus:shadow-inset focus:outline-none motion-reduce:transition-none"
                  aria-label="Select tag"
                >
                  <option value="">Category: None</option>
                  {tags && tags.map((tag) => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
                <button
                  type='submit'
                  className="flex items-center whitespace-nowrap px-3 py-[0.25rem] text-surface [&>svg]:h-5 [&>svg]:w-5 ml-2"
                  id="button-addon2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="container mx-auto p-4">
          <div className="w-5/6 m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {infographics.map((infographic) => (
              <Card
                key={infographic._id}
                ids={infographic._id}
                imageUrl={`https://utility.caclouddesk.com/uploads/footer-${infographic.image}`}
                downloads={infographic.downloads || '0'}
                tags={infographic.tags || ['General']}
                description={infographic.description}
                title={infographic.title}
              />
            ))}
          </div>
          <div className="flex justify-between items-center mt-4">
            <button
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className={`px-4 py-2 rounded ${page === 1 ? '' : 'bg-blue-500 text-white'}`}
            >
              <img src={arrow2} alt="" className={`w-8 rotate-180 ${page === 1 ? 'saturate-0' : ''}`} />
            </button>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
              className={`px-4 py-2 rounded`}
            >
              <img src={arrow2} alt="" className={`w-8 ${page >= totalPages ? 'saturate-0' : ''}`} />
            </button>
          </div>
        </div>
      </section>
      <Common />
    </>
  );
};

export default SearchPage;
