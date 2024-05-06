/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ConfirmDialog from "./Navbar/ConfirmDialog";
export default function Modal({ showModal, setShowModal, filing, gstDetails, gstin,prd }) {
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    
    useEffect(() => {
        setTimeout(() => {
            setShowPopup(false);
        }, 10000);
    }, [showPopup])

    const verifyEmail = (email) => {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {

            setIsValidEmail(true);
        } else {
            setIsValidEmail(false);
        }
    };

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        setIsLoading(true)

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "email": email,
            "details": {
                bsnm: gstDetails.lstAppSCommonSearchTPResponse[0].lgnm,
                gstin: gstDetails.lstAppSCommonSearchTPResponse[0].RequestedGSTIN,
                lgnm: gstDetails.lstAppSCommonSearchTPResponse[0].tradeNam  ,
                pan: gstin.slice(2, 12),
                prd: prd || null,
                address: gstDetails.lstAppSCommonSearchTPResponse[0].pradr.addr.bno+" "+gstDetails.lstAppSCommonSearchTPResponse[0].pradr.addr.bnm+' '+gstDetails.lstAppSCommonSearchTPResponse[0].pradr.addr.st+' '+gstDetails.lstAppSCommonSearchTPResponse[0].pradr.addr.stcd,
                entityType: gstDetails.lstAppSCommonSearchTPResponse[0].ctb,
                natureOfBusiness: gstDetails.lstAppSCommonSearchTPResponse[0].nba[0],
                pincode: gstDetails.lstAppSCommonSearchTPResponse[0].pradr.addr.pncd,
                departmentCode: gstDetails.lstAppSCommonSearchTPResponse[0].ctj,
                registrationType: gstDetails.lstAppSCommonSearchTPResponse[0].dty,
                registrationDate: gstDetails.lstAppSCommonSearchTPResponse[0].rgdt
            },
            "filling": filing||null
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
        setIsLoading(false)
        setShowModal(false) 
        setShowPopup(true) ;

        fetch(import.meta.env.VITE_BACK+"/send-api", requestOptions)
            .then((response) => response.text())
            .then((result) => {toast(JSON.parse(result).message) ;setEmail('');})
            .catch(() => toast.error("Error")) 
    };
    return (
        <>
            <ConfirmDialog showPopup={showPopup} />
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative my-6 mx-auto md:w-[40vw] w-auto p-4">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-2xl font-semibold">
                                        Send PDF to your Email
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="modal-content p-3">
                                    <h2 className="text-2xl mb-4">Enter your email</h2>

                                    <input
                                        className="border border-gray-300 rounded-md p-2 w-full mb-4"
                                        type="email"
                                        placeholder="Your email"
                                        value={email}
                                        onChange={(e) => {
                                            verifyEmail(e.target.value);
                                            handleChange(e);
                                        }}
                                    />
                                    {!isValidEmail && email.length > 0 && <p className="text-red-600">Please enter a valid Email*</p>}

                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6  rounded-b">
                                    <button
                                        className={`text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 `}
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className={`bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ${!isValidEmail||isLoading ? ' cursor-not-allowed' : ''}`}
                                        type="button"
                                        disabled={!isValidEmail || isLoading}
                                        onClick={(e) => handleSubmit(e)}
                                    >
                                        Send Mail
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}
