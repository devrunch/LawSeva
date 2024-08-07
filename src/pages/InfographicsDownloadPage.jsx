/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Trending from '../components/Sections/Trending';
import { toast } from 'react-toastify';
import { logo1, logo2, logo3 } from '../components/base64';
import upload from '../assets/info/upload.svg';
import Modal from 'react-modal';
import Common from '../components/Sections/Common';

const colors = [
  { name: 'red', hex: '#f87171' },
  { name: 'green', hex: '#34d399' },
  { name: 'blue', hex: '#60a5fa' },
  { name: 'yellow', hex: '#fbbf24' },
  { name: 'purple', hex: '#a78bfa' }
];

const predefinedLogos = [
  { name: 'Logo 1', url: logo1 },
  { name: 'Logo 2', url: logo2 },
  { name: 'Logo 3', url: logo3 }
];

const InfographicDownloadPage = () => {
  const { id } = useParams();
  const [infographic, setInfographic] = useState(null);
  const [selectedColor, setSelectedColor] = useState(colors[0].hex);
  const [selectedLogo, setSelectedLogo] = useState('https://as2.ftcdn.net/v2/jpg/04/78/56/33/1000_F_478563312_HuepEVbPHRGC0dsbXOXL1YSuFIkWEm2m.jpg');
  const [customLogo, setCustomLogo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [downloadLink, setDownloadLink] = useState('');
  const [blobs, setBlobs] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [formData, setFormData] = useState(localStorage.getItem('formData') ? JSON.parse(localStorage.getItem('formData')) : {
    name: '',
    phone: '',
    email: '',
    website: ''
  });

  const [warnings, setWarnings] = useState({
    name: '',
    phone: '',
    email: '',
    website: ''
  });
  const warnnings = {
    name: 'Name can be upto 20 characters',
    phone: 'Phone number can be upto 13 characters',
    email: 'Email can only be upto 25 characters',
    website: 'Website can only be upto 15 characters'
  }

  const limit = {
    name: 20,
    phone: 13,
    email: 25,
    website: 15

  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (value.length > limit[name]) {
      setWarnings({ ...warnings, [name]: warnnings[name] });
    } else {
      setWarnings({ ...warnings, [name]: '' });
    }
  };
  useEffect(() => {
    fetchInfographic();
  }, [id]);

  const fetchInfographic = async () => {
    try {
      const response = await fetch(`https://utility.caclouddesk.com/api/infographics/${id}`);
      const data = await response.json();
      setInfographic(data);
    } catch (error) {
      toast.error('INVALID INFOGRAPHIC LINK');
      console.error('Error fetching infographic:', error);
    }
  };
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this Infographic!',
          text: 'Here is an Infographic I generated using CA CloudDesk Infographics.',
          files: [blobs], // Link to the infographic image
        });
        toast.success('Shared successfully!');
      } catch (error) {
        console.error('Error sharing:', error);
        toast.error('Error sharing the infographic.');
      }
    } else {
      toast.error('Web Share API not supported in this browser.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGenerating(true);
    let isLogo = true;
    const formData = new FormData(e.target);
    if (!selectedLogo && !customLogo) {
      isLogo = false;
    }
    let logoBase64 = selectedLogo;
    if (customLogo) {
      logoBase64 = await convertToBase64(customLogo);
    }

    localStorage.setItem('formData', JSON.stringify({
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      website: formData.get('website'),
    }));

    try {
      const response = await fetch(`https://utility.caclouddesk.com/api/infographics/${id}/download`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          info: {
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            website: formData.get('website'),
            isLogo: isLogo,
            logoBase64: logoBase64,
          },
          bgColor: selectedColor,
        })
      });

      const arrayBuffer = await response.arrayBuffer();
      const blob = new Blob([arrayBuffer], { type: 'image/png' });
      const filess = new File([blob], 'downloaded_image.png', { type: 'image/png' });
      setBlobs(filess);
      console.log(filess)
      const link = URL.createObjectURL(blob);
      setDownloadLink(link);
      setShowModal(true);
      setGenerating(false);
    } catch (error) {
      toast.error('Error downloading infographic.');
      setGenerating(false);
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = downloadLink;
    link.download = 'downloaded_image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowModal(false);
  };

  if (!infographic) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container mx-auto my-10 p-4">
        <div className="container mx-auto p-4 flex flex-col lg:flex-row items-center lg:items-start">
          <div className="w-full lg:w-1/2 ">
            {/* <div className='box_scale'> */}
            <div>

              <img src={`https://utility.caclouddesk.com/uploads/${infographic.image}`} alt="Infographic" className="m-auto shadow-lg w-full md:w-[450px] " />
              <div className='h-[60px] md:h-[80px] w-full md:w-[450px] m-auto flex justify-center items-center gap-x-[20px]' style={{ background: selectedColor }}>
                {selectedLogo || customLogo ?<div className="logo rounded-full overflow-hidden flex justify-center items-center bg-white">
                  <img src={selectedLogo ? selectedLogo : customLogo ? URL.createObjectURL(customLogo) : "https://as2.ftcdn.net/v2/jpg/04/78/56/33/1000_F_478563312_HuepEVbPHRGC0dsbXOXL1YSuFIkWEm2m.jpg"} className='h-[40px] w-[50px] md:w-[70px] md:h-[70px] rounded-[100%]' alt="" />
                </div>:''}
                <div className="info grid grid-cols-2 gap-x-5 gap-y-3 "> 
                  <div className="infowrap flex items-center">
                    <svg
                      width="15px"
                      height="15px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="12" cy="9" r="3" stroke="#fff" stroke-width="1.5" />
                      <circle cx="12" cy="12" r="10" stroke="#fff" stroke-width="1.5" />
                      <path
                        d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20"
                        stroke="#fff"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                    </svg>
                    <p className='text-[10px] md:text-[12px] text-white'>
                      {formData.name || "Your Name"}
                    </p>
                  </div>
                  <div className="infowrap flex items-center">
                    <svg
                      width="18px"
                      height="18px"
                      viewBox="0 -0.5 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M6.24033 8.16795C6.99433 7.37295 7.26133 7.14995 7.58233 7.04695C7.80482 6.98843 8.03822 6.98499 8.26233 7.03695C8.55733 7.12295 8.63433 7.18795 9.60233 8.15095C10.4523 8.99695 10.5363 9.08895 10.6183 9.25095C10.7769 9.54253 10.8024 9.88825 10.6883 10.1999C10.6043 10.4349 10.4803 10.5909 9.96533 11.1089L9.62933 11.4459C9.54093 11.5356 9.51997 11.6719 9.57733 11.7839C10.3232 13.0565 11.3812 14.1179 12.6513 14.8679C12.7978 14.9465 12.9783 14.921 13.0973 14.8049L13.4203 14.4869C13.6199 14.2821 13.8313 14.0891 14.0533 13.9089C14.4015 13.6935 14.8362 13.6727 15.2033 13.8539C15.3823 13.9379 15.4423 13.9929 16.3193 14.8669C17.2193 15.7669 17.2483 15.7959 17.3493 16.0029C17.5379 16.3458 17.536 16.7618 17.3443 17.1029C17.2443 17.2949 17.1883 17.3649 16.6803 17.8839C16.3733 18.1979 16.0803 18.4839 16.0383 18.5259C15.6188 18.8727 15.081 19.043 14.5383 19.0009C13.5455 18.9101 12.5847 18.6029 11.7233 18.1009C9.81416 17.0894 8.18898 15.6155 6.99633 13.8139C6.73552 13.4373 6.50353 13.0415 6.30233 12.6299C5.76624 11.7109 5.48909 10.6638 5.50033 9.59995C5.54065 9.04147 5.8081 8.52391 6.24033 8.16795Z"
                        stroke="#fff"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M14.8417 4.29409C14.4518 4.15416 14.0224 4.35677 13.8824 4.74664C13.7425 5.1365 13.9451 5.56598 14.335 5.70591L14.8417 4.29409ZM18.7868 10.0832C18.9333 10.4707 19.3661 10.666 19.7536 10.5195C20.141 10.373 20.3364 9.94021 20.1899 9.55276L18.7868 10.0832ZM13.6536 6.52142C13.2495 6.43018 12.848 6.68374 12.7568 7.08778C12.6655 7.49182 12.9191 7.89333 13.3231 7.98458L13.6536 6.52142ZM16.5696 11.1774C16.6676 11.5799 17.0733 11.8267 17.4757 11.7287C17.8782 11.6307 18.125 11.2251 18.0271 10.8226L16.5696 11.1774ZM14.335 5.70591C16.3882 6.44286 18.0153 8.04271 18.7868 10.0832L20.1899 9.55276C19.2631 7.10139 17.3084 5.17942 14.8417 4.29409L14.335 5.70591ZM13.3231 7.98458C14.9238 8.34607 16.1815 9.58301 16.5696 11.1774L18.0271 10.8226C17.5042 8.67475 15.8098 7.0084 13.6536 6.52142L13.3231 7.98458Z"
                        fill="#fff"
                      />
                    </svg>
                    <p className='text-[10px] md:text-[12px] text-white'>
                      {formData.phone || "Your Phone"}
                    </p>
                  </div>
                  <div className="infowrap flex items-center">
                    <svg
                      width="15px"
                      height="15px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.02832 10L10.2246 14.8166C10.8661 15.2443 11.1869 15.4581 11.5336 15.5412C11.8399 15.6146 12.1593 15.6146 12.4657 15.5412C12.8124 15.4581 13.1332 15.2443 13.7747 14.8166L20.971 10M10.2981 4.06879L4.49814 7.71127C3.95121 8.05474 3.67775 8.22648 3.4794 8.45864C3.30385 8.66412 3.17176 8.90305 3.09111 9.161C3 9.45244 3 9.77535 3 10.4212V16.8C3 17.9201 3 18.4802 3.21799 18.908C3.40973 19.2843 3.71569 19.5903 4.09202 19.782C4.51984 20 5.07989 20 6.2 20H17.8C18.9201 20 19.4802 20 19.908 19.782C20.2843 19.5903 20.5903 19.2843 20.782 18.908C21 18.4802 21 17.9201 21 16.8V10.4212C21 9.77535 21 9.45244 20.9089 9.161C20.8282 8.90305 20.6962 8.66412 20.5206 8.45864C20.3223 8.22648 20.0488 8.05474 19.5019 7.71127L13.7019 4.06879C13.0846 3.68116 12.776 3.48735 12.4449 3.4118C12.152 3.34499 11.848 3.34499 11.5551 3.4118C11.224 3.48735 10.9154 3.68116 10.2981 4.06879Z"
                        stroke="#fff"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p className='text-[10px] md:text-[12px] text-white'>
                      {formData.email || "Your Email"}
                    </p>
                  </div>
                  <div className="infowrap flex items-center">
                    <svg
                      fill="#fff"
                      width="12px"
                      height="12px"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16 7.38A7.82 7.82 0 0 0 8 .5a7.82 7.82 0 0 0-8 6.88v1.24a7.82 7.82 0 0 0 8 6.88 7.82 7.82 0 0 0 8-6.88V7.38zm-1.25 0h-3a11.34 11.34 0 0 0-.43-2.54 7.6 7.6 0 0 0 1.75-1 6 6 0 0 1 1.65 3.54zm-9.18 0a9.69 9.69 0 0 1 .37-2.14A8.43 8.43 0 0 0 8 5.5a8.49 8.49 0 0 0 2.09-.26 10.2 10.2 0 0 1 .37 2.14zm4.92 1.24a9.59 9.59 0 0 1-.37 2.14 8.53 8.53 0 0 0-4.18 0 9.69 9.69 0 0 1-.37-2.14zm.4-5A11.82 11.82 0 0 0 10 2a6.89 6.89 0 0 1 2 1 6.57 6.57 0 0 1-1.14.66zm-2.6-1.86a10 10 0 0 1 1.38 2.3A7.63 7.63 0 0 1 8 4.25a7.56 7.56 0 0 1-1.67-.19 9.82 9.82 0 0 1 1.38-2.3h.58zm-3.15 1.9A6.57 6.57 0 0 1 4 3a6.89 6.89 0 0 1 2-1 10.38 10.38 0 0 0-.86 1.66zM3 3.83a7.6 7.6 0 0 0 1.75 1 11 11 0 0 0-.43 2.54h-3A6 6 0 0 1 3 3.83zM1.28 8.62h3a11 11 0 0 0 .43 2.54 7.6 7.6 0 0 0-1.75 1 6 6 0 0 1-1.68-3.54zm3.86 3.72A10.38 10.38 0 0 0 6 14a6.89 6.89 0 0 1-2-1 6.57 6.57 0 0 1 1.14-.66zm2.57 1.9a9.82 9.82 0 0 1-1.38-2.3 7.43 7.43 0 0 1 3.34 0 9.76 9.76 0 0 1-1.38 2.3h-.58zm3.15-1.9a6.57 6.57 0 0 1 1.19.66 7.24 7.24 0 0 1-2 1 11.48 11.48 0 0 0 .81-1.66zm2.14-.17a7.6 7.6 0 0 0-1.75-1 10.8 10.8 0 0 0 .43-2.54h3A6 6 0 0 1 13 12.17z"
                      />
                    </svg>
                    <p className='text-[10px] md:text-[12px] text-white'>
                      {formData.website || "Your Website"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 mt-4 lg:mt-0 lg:ml-4 p-4 bg-white rounded-md">
            <h1 className="text-2xl font-bold mb-4 capitalize">{infographic.title}</h1>
            <form onSubmit={handleSubmit}>
              <div className='grid grid-cols-4 w-[80%] gap-y-3 grid-rows-4 justify-start font-manrope'>
                <label className='col-span-1' htmlFor="name">Firm Name<span className='text-red-600'>*</span></label>
                <div className="col-span-3">
                  <input
                    type="text"
                    className='border border-gray-400 rounded-md ml-2 w-full'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    required
                    maxLength={limit.name + 1}
                  />
                  {warnings.name && <span className='m-2 text-xs text-red-600'>{warnings.name}</span>}
                </div>

                <label className='col-span-1' htmlFor="phone">Phone<span className='text-red-600'>*</span></label>
                <div className="col-span-3">
                  <input
                    type="text"
                    className='border border-gray-400 rounded-md ml-2 w-full'
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    maxLength={limit.phone + 1}
                  />
                  {warnings.phone && <span className='m-2 text-xs text-red-600'>{warnings.phone}</span>}
                </div>

                <label className='col-span-1' htmlFor="email">E-mail</label>
                <div className="col-span-3">
                  <input
                    type="email"
                    className='border border-gray-400 rounded-md ml-2 w-full'
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    maxLength={limit.email + 1}
                  />
                  {warnings.email && <span className='m-2 text-xs text-red-600'>{warnings.email}</span>}
                </div>

                <label className='col-span-1' htmlFor="website">Website</label>
                <div className="col-span-3">
                  <input
                    type="text"
                    className='border border-gray-400 rounded-md ml-2 w-full'
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    maxLength={limit.website + 1}

                  />
                  {warnings.website && <span className=' m-2 text-xs text-red-600'>{warnings.website}</span>}
                </div>
                <label className=' col-span-1' htmlFor="logo">Logo Upload</label>
                <div className='col-span-3 flex items-center gap-5 flex-wrap '>
                  {predefinedLogos.map((logo) => (
                    <label key={logo.name} className="flex items-center mb-2">
                      <input
                        type="radio"
                        name="logo"
                        value={logo.url}
                        checked={selectedLogo === logo.url}
                        onChange={() => {
                          setSelectedLogo(logo.url);
                          setCustomLogo(null);
                        }}
                        className="mr-2"
                        hidden
                      />
                      <img src={logo.url} alt={logo.name} className={`w-12 h-12 rounded-full p-1 ${selectedLogo == logo.url ? " border-black border-2" : ""}`} />
                    </label>
                  ))}
                  <p className='text-paragraph font-ubuntu'>or</p>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="logo"
                      value="custom"
                      checked={customLogo !== null}
                      onChange={() => {
                        setSelectedLogo('');
                        setCustomLogo(null);
                      }}
                      className="mr-2"
                      hidden
                    />
                    <img src={customLogo ? URL.createObjectURL(customLogo) : upload} alt='custom logo' className={`w-12 h-12 rounded-full p-1 ${customLogo ? 'border-2 border-black' : ''} `} />
                    <input
                      type="file"
                      className={`absolute w-12 h-12  rounded-full file:bg-transparent file:text-transparent file:border-none file:text-opacity-0`}
                      name='customLogo'
                      onChange={(e) => { setCustomLogo(e.target.files[0]); setSelectedLogo(''); }}
                    />
                  </label>
                </div>
              </div>
              <h1 className='mt-10 mb-5 font-manrope font-bold'>Select Colour</h1>
              <div className="flex space-x-4">
                {colors.map((color) => (
                  <label key={color.name} className="cursor-pointer">
                    <input
                      type="radio"
                      name="color"
                      value={color.hex}
                      checked={selectedColor === color.hex}
                      onChange={() => setSelectedColor(color.hex)}
                      className="hidden"
                    />
                    <span
                      className={`inline-block w-8 h-8 rounded-full border-4 box-content ${selectedColor === color.hex ? 'border-blue-500 shadow-cyan-500 shadow-2xl' : 'border-transparent'}`}
                      style={{ backgroundColor: color.hex }}
                    ></span>
                  </label>
                ))}
              </div>
              <div >
                <button type='submit' disabled={generating} className='bg-[#31A6C7] font-bold text-white px-8 py-2 mt-5 rounded-md hover:text-secondary hover:bg-white hover:border-secondary border-2 border-transparent transition-all'>View</button>
              </div>
            </form>
          </div>
        </div>
        <Trending />
        <Common />
      </div>

      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Image Preview"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full flex flex-col justify-center items-center">
          <div className='w-full flex items-center justify-end'>
            <button onClick={() => setShowModal(false)}>
              <svg width="30" height="30" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M28.5 9.5L9.5 28.5" stroke="#7D7D7D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M9.5 9.5L28.5 28.5" stroke="#7D7D7D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>

          </div>
          <img src={downloadLink} alt="Infographic Preview" className="object-contain mb-4" />
          <div className='w-full flex justify-end gap-x-5'>

            <button
              onClick={handleDownload}
              className="bg-[#31A6C7] text-white px-4 py-2 rounded-md hover:text-secondary hover:bg-white hover:border-secondary border-2 border-transparent transition-all"
            >
              Download
            </button>
            <button
              onClick={handleShare}
              className=" flex items-center bg-white text-black px-4 py-2 rounded-md hover:text-secondary hover:bg-white hover:border-secondary border-2 border-gray-700 transition-all"
            >
              Share
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default InfographicDownloadPage;
