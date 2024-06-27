/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import tick from '../../assets/tick2.svg';
const ConfirmDialog = ({showPopup,email}) => {
    

    return (
        <div
            className={`fixed inset-0 flex flex-col items-center justify-center z-50 ${showPopup ? 'opacity-100' : 'opacity-0 pointer-events-none'
                } transition-opacity duration-300`}
        >

            <div className="bg-white rounded-lg p-6 shadow-2xl transform transition-all duration-300 flex flex-col items-center">
                <div className="absolute top-[-16px] flex justify-center items-center">
                    <img src={tick} className="h-20 w-20 object-contain" alt="Logo" />
                </div>
                <p className="mb-4 text-[#3b81f5] font-bold text-2xl mt-12 font-[poppins] text-center">Filling Details Sent to Your<br /> Email !</p>
                <p className='text-lg text-[#7D7D7D] font-semibold font-[poppins] text-center my-3'>Want to elevate your Chartered Accountancy<br /> Practice and streamline your office <br />management tasks?</p>
                <p className='text-sm text-[#7D7D7D] font-semibold font-[poppins] text-center my-3'>PDF is sent to your email<br /> {email}</p>
                <div className="flex justify-end">

                    <Link
                        className="px-4 py-2 mr-2 text-white bg-[#3B82F6] border-solid border-[#3B82F6] border-[2px] font-bold rounded-full transition-colors duration-300"
                        to={'https://demo.caclouddesk.com/'}
                    >
                        Try CA Cloud Desk
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;