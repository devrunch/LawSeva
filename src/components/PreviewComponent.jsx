/* eslint-disable react/prop-types */
const PreviewComponent = ({ imgLink, footerInfo, bgColor ,logo,generating}) => {
  return (
    <div className="md:w-[540px] w-[360px] overflow-hidden">
      <img
        src={`https://utility.caclouddesk.com/uploads/${imgLink}`}
        alt="Background"
        className="w-full h-auto object-cover"
        crossOrigin="anonymous"
      />
      <div
        className={`w-full h-[100px] font-bold ${bgColor ? '' : 'bg-black'} flex justify-start gap-x-1 px-2 items-center`}
        style={{ backgroundColor: bgColor || '#000' }}
      >
        <div className={`w-1/6 flex justify-center items-center `}>
          <img
            src={logo || "https://as2.ftcdn.net/v2/jpg/04/78/56/33/1000_F_478563312_HuepEVbPHRGC0dsbXOXL1YSuFIkWEm2m.jpg"}
            alt="Logo"
            className="w-[75%] h-auto  rounded-full bg-white"
            crossOrigin="anonymous"
          />
        </div>
        <div className={`min-w-[50%] max-w-[80%] h-full  flex flex-col justify-center items-stretch text-white text-[16px] ${generating?'-mt-3':''}`}>
          <div className={`flex items-center`}>
            <i className="fa fa-user mr-2"></i>
            <p>
              <span>{footerInfo.name || 'Your Name'}</span>
            </p>
          </div>
          <div className={`flex items-center`}>
            <i className="fa fa-phone mr-2"></i>
            <p>
              <span>{footerInfo.phone || 'Your Phone'}</span>
            </p>
          </div>
          {footerInfo.email && (
            <div className={`flex items-center`}>
              <i className="fa fa-envelope mr-2"></i>
              <p>
                <span>{footerInfo.email}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewComponent;
