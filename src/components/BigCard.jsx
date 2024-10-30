/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

const Card = ({ imgSrc,  category, description }) => {
  let encodedCategory = encodeURIComponent(category);
  return (
    <div className='bg-white md:w-auto w-[46%] p-2 rounded-md flex flex-col justify-between gap-y-1 pb-4'>
      <div className='lg:w-72 h-64 bg-primary2 rounded-md' style={{ backgroundImage: `url(https://utility.caclouddesk.com/uploads/${imgSrc})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
      <div className='lg:w-72 flex items-center justify-between px-1'>
        <p className='text-xs px-2 py-1 bg-green-200 text-green-700 font-semibold rounded-full uppercase'>{category}</p>
        <p className='flex text-paragraph text-sm'></p>
      </div>
      <div className='lg:w-72'>
        <h1 className='font-manrope font-bold'>{description }</h1>
      </div>
      <div className='flex justify-center'>
        <Link to={encodeURI(`/infographics/search?tag=${encodedCategory}`)} className="w-full text-center py-1 bg-secondary text-white hover:bg-secondaryhover transition-colors rounded-full">Select</Link>
      </div>
    </div>
  );
};

export default Card;
