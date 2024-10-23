/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Trending from '../components/Sections/Trending';
import { toast } from 'react-toastify';
import { logo1, logo2, logo3 } from '../components/base64';
import upload from '../assets/info/upload.svg';
import Modal from 'react-modal';
import Common from '../components/Sections/Common';
import PreviewComponent from '../components/PreviewComponent';
import Infographics from '../components/InfographicsGrid';
const colors = [
  { name: 'red', hex: '#f87171' },
  { name: 'green', hex: '#34d399' },
  { name: 'blue', hex: '#60a5fa' },
  { name: 'yellow', hex: '#fbbf24' },
  { name: 'purple', hex: '#a78bfa' },
  { name: 'black', hex: '#000' }
];

const predefinedLogos = [
  { name: 'Logo 1', url: logo1 },
  { name: 'Logo 2', url: logo2 },
  { name: 'Logo 3', url: logo3 }
];

const warnnings = {
  name: 'Name can be upto 50 characters',
  phone: 'Phone number can be upto 15 characters',
  email: 'Email can only be upto 50 characters',
}

const limit = {
  name: 45,
  phone: 15,
  email: 50,
}

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
  });

  const [warnings, setWarnings] = useState({
    name: '',
    phone: '',
    email: '',
  });

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
    const formData = localStorage.getItem('formData');
    if (formData) {
        try {
            let tp = JSON.parse(formData);
            let w = {};
            for (let key in tp) {
                if (tp[key].length > limit[key]) {
                    w[key] = warnings[key];
                }
            }
            setWarnings(w);
        } catch (error) {
            console.error('Error parsing formData:', error);
        }
    }
    fetchInfographic();
}, []);


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
      email: formData.get('email')
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
        <div className="container mx-auto p-4 flex flex-col lg:flex-row items-center justify-around">
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <PreviewComponent imgLink={infographic.image} footerInfo={formData} bgColor={selectedColor} logo={customLogo?URL.createObjectURL(customLogo):selectedLogo}/>
          </div>
          <div className="w-full lg:w-1/2 mt-4 lg:mt-0 lg:ml-4 p-4 bg-white rounded-md">
            <h1 className="text-2xl font-bold mb-4 capitalize">{infographic.title}</h1>
            <form onSubmit={handleSubmit}>
              <div className='grid grid-cols-4 w-[80%]  grid-rows-4 justify-start font-manrope items-center '>
                <label className='col-span-1' htmlFor="name">Firm Name<span className='text-red-600'>*</span></label>
                <div className="col-span-3">
                  <input
                    type="text"
                    className='border border-gray-400 rounded-md ml-2 w-full p-1'
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
                    className='border border-gray-400 rounded-md ml-2 w-full p-1 '
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
                    className='border border-gray-400 rounded-md ml-2 w-full p-1'
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    maxLength={limit.email}
                  />
                  {warnings.email && <span className='m-2 text-xs text-red-600'>{warnings.email}</span>}
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
                <button type='submit' disabled={generating} className='bg-[#31A6C7] font-bold text-white px-8 py-2 mt-5 rounded-md hover:text-secondary hover:bg-white hover:border-secondary border-2 border-transparent transition-all'>{generating ? <><p><span className="loading-dots flex space-x-1">
                  <span className="dot animate-blink">Loading.</span>
                  <span className="dot animate-blink delay-200">.</span>
                  <span className="dot animate-blink delay-400">.</span>
                </span></p></> : 'View'}</button>
              </div>
            </form>
          </div>
        </div>
        <section className='features mt-8'>
        {/* <h2 className="text-primary font-manrope font-semibold uppercase text-center">Similar Infographics</h2> */}
            {/* <h1 className='text-center text-5xl font-manrope font-bold'>Trending Infographic Templates</h1> */}
        </section>
        <Infographics  description={infographic.title +' '+infographic.description} category={infographic.tags[0]} count={4}/>
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
