import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const Card = ({ imageUrl, tags, title, ids,description }) => {
  return (
    <div className='bg-white w-full md:w-60 rounded-md space-y-4 flex flex-col justify-between pb-4 shadow-md'>
      <div className='h-[17rem] rounded-md flex items-end justify-start relative'>
        <img src={imageUrl} alt={title} className='w-full h-full object-cover rounded-md' />
      </div>
      <div className='flex w-f items-center justify-between px-3'>
        <p className='text-xs px-2 py-1 bg-green-200 text-green-700 font-semibold rounded-full uppercase'>{tags}</p>
        {/* <div className="p-1 bg-[#f3f4f6de] border-2 border-gray-200 rounded-md font-manrope text-green-500 text-sm">
          {downloads} Downloads
        </div> */}
      </div> 
      <div>
      <h1 className='font-manrope font-extrabold text-lg text-left px-3'>{title}</h1>
      <p className='font-manrope text-xs text-paragraph text-left px-3'>{description}</p>
      </div>
      <div className='flex justify-center px-3'>
        <Link to={`/infographics/download/${ids}`} className="w-full text-center py-1 bg-secondary text-white hover:bg-secondaryhover transition-colors rounded-full">
          Select
        </Link>
      </div>
    </div>
  );
}

export default Card;
