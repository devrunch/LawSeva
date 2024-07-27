import { useState } from "react";
import Spinner from "../components/Spinner";
import EmailModal from "../components/EmailModal";
import { isValidGSTNumber } from "@scrrum-labs/gst-india-utils";
import { toast } from "react-toastify";
import { GoogleReCaptchaProvider, GoogleReCaptcha } from "react-google-recaptcha-v3";
import Content from "../components/Content";
const taxPeriod = {
    'GSTR3B': 'Monthly',
    'GSTR1': 'Monthly',
    'GSTR2X': 'Quaterly',
    'GSTR9C': 'Annualy',
    'GSTR9': 'Annualy',
    'ITC04': 'Annualy/Half Yearly',
}
const gstRet = ['GSTR3B', 'GSTR1', 'GSTR2X', 'TRAN2']
const Months = ['JANUARY', 'FEBRUARY',
    'MARCH',
    'APRIL',
    'MAY',
    'JUNE',
    'JULY',
    'AUGUST',
    'SEPTEMBER',
    'OCTOBER',
    'NOVEMBER',
    'DECEMBER']
function getFinYears(startDate) {
    const startYear = parseInt(startDate.split('/')[2]);
    const currentYear = new Date().getFullYear() + 1;
    const years = [];

    for (let year = startYear; year <= currentYear - 1; year++) {
        years.push(`${year}-${(year + 1).toString().slice(2)}`);
    }

    return years.reverse();
}
const TaxPayer = () => {
    const [token, setToken] = useState("");
    const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);
    const [gstNumber, setGSTNumber] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [gstDetails, setGstDetails] = useState()
    const [loadingGstDetails, setLoadingGstDetails] = useState(false)
    const [loadingFilDetails, setLoadingFilDetails] = useState(false)
    const [finYear, setFinYear] = useState('2022-23')
    const [allfin, setAllfin] = useState([])
    const [filingDet, setFilingDet] = useState([])

    // const [filingData, setFilingData] = useState()

    const setTokenFunc = (getToken) => {
        setToken(getToken);
    };

    const verifyGSTNumber = (gst) => {
        console.log(gst)
        console.log(isValidGSTNumber(gst))
        if (isValidGSTNumber(gst.trim())) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    };

    const handleGstVerify = (e) => {
        setGSTNumber(e.target.value.toLocaleUpperCase());
        verifyGSTNumber(e.target.value.toLocaleUpperCase());
    };

    const searchGst = () => {
        console.log("searching gst")
        setLoadingGstDetails(true)
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "token": token,
            "gstin": gstNumber,
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(import.meta.env.VITE_BACK + "/gst/gstUser", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                const tem = JSON.parse(result)
                if (tem.message === "Invalid Captcha") {
                    toast.error("Invalid Captcha")
                }
                else if (tem.Status !== "0") {
                    setGstDetails(tem)
                    setLoadingGstDetails(false)
                    setAllfin(getFinYears(tem.lstAppSCommonSearchTPResponse[0].rgdt))
                    setFinYear('2023-24')
                    fetchFiling(getFinYears(tem.lstAppSCommonSearchTPResponse[0].rgdt)[0])
                    console.log(tem)
                }
                else {
                    toast.error("Invalid GST Number")
                    setLoadingGstDetails(false)
                }
            })
            .catch(() => {
                setRefreshReCaptcha(!refreshReCaptcha);
                toast.error("Some Error Occured")
            })
            .finally(() => setLoadingGstDetails(false));

    }
    function getAddressString(address) {
        const { bnm, bno, flno, loc, pncd, st, stcd } = address;

        // Build the address string
        let addressString = '';

        if (bnm) addressString += `${bnm}, `;
        if (bno) addressString += `${bno}, `;
        if (flno) addressString += `${flno}, `;
        if (loc) addressString += `${loc}, `;
        if (st) addressString += `${st}, `;
        if (stcd) addressString += `${stcd}, `;
        if (pncd) addressString += `${pncd}`;

        // Remove trailing comma and space, if any
        addressString = addressString.trim().replace(/,\s*$/, '');

        return addressString;
    }

    const fetchFiling = async (prd) => {
        setFinYear(prd)
        setLoadingFilDetails(true);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "token": token,
            "gstin": gstNumber,
            "year": prd
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        await fetch(import.meta.env.VITE_BACK + "/gst/gstfiling", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                if (result.message) {
                    toast("No Filing Details Found for this Year")
                    toast("Change the Filing year or Check GSTIN Status")
                }
                else {
                    setFilingDet(result)
                }
            })
            .catch((error) => console.error(error))
            .finally(() => setLoadingFilDetails(false));


    };
    return (
        <>
            <EmailModal setShowModal={setModalIsOpen} showModal={modalIsOpen} filing={filingDet} gstDetails={gstDetails} gstin={gstNumber} prd={finYear} />
            <div className="w-full bg-white p-2 md:p-8 ">
                <div className="px-6 py-4 bg-white shadow-md container m-auto">


                    <div className="m-auto">

                        <div className="md:w-11/12 m-auto">
                            <h1 className="text-3xl font-bold">GST Number Search Tool - GSTIN Verification / Filing Details Online</h1>
                            <p className="text-lg mt-3 ">GSTIN/UIN of the Taxpayer<span className="text-red-700 font-bold">*</span></p>

                            <form className=" m-auto my-8" onSubmit={(e) => { e.preventDefault(); searchGst() }} >
                                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only ">Search</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="search"
                                        id="default-search"
                                        className="block text-xl w-full p-4 ps-10 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                                        placeholder="Enter GSTIN/UIN of the Taxpayer"
                                        onChange={(e) => handleGstVerify(e)}
                                        value={gstNumber}
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className={`z-20 text-white text-lg absolute end-2.5 bottom-[10px] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded px-4 py-2 ${!isValid ? ' cursor-not-allowed' : ''} `
                                        }
                                        disabled={!isValid}
                                    >
                                        Search
                                    </button>
                                    <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_SITEKEY}>
                                        <GoogleReCaptcha
                                            className="google-recaptcha"
                                            onVerify={setTokenFunc}
                                            refreshReCaptcha={refreshReCaptcha}
                                        />
                                    </GoogleReCaptchaProvider>
                                </div>
                                {isValid && <p className="text-green-600">Seems to be Valid GST Number</p>}
                                {!isValid && gstNumber.length > 0 && <p className="text-red-600">Please enter a valid GST Number*</p>}
                            </form>
                        </div>

                        <Spinner state={loadingGstDetails} />
                        {gstDetails &&
                            <div className=" lg:w-5/6 px-12 m-auto my-8 pt-14 pb-2 shadow-md rounded border border-grey-250 flex flex-wrap sm:pt-6 sm:px-6">
                                <div className="w-full mb-12 pr-5 md:w-1/3 sm:w-1/2 sm:mb-6">
                                    <span className="anchor sm:hidden" id="Business Name"></span>
                                    <h4 className="text-font-200 uppercase text-base mb-2 font-bold sm:text-s-14">Legal Name of Business</h4>
                                    <small className="text-s-20 text-font-500 font-medium sm:text-base">{gstDetails.lstAppSCommonSearchTPResponse[0].lgnm}</small>
                                </div>
                                <div className="w-full mb-12 pr-5 md:w-1/3 sm:w-1/2 sm:mb-6">
                                    <span className="anchor sm:hidden" id="Business Name"></span>
                                    <h4 className="text-font-200 uppercase text-base mb-2 font-bold sm:text-s-14">Trade Name of Business</h4>
                                    <small className="text-s-20 text-font-500 font-medium sm:text-base">{gstDetails.lstAppSCommonSearchTPResponse[0].tradeNam}</small>
                                </div>
                                <div className="w-full mb-12 pr-5 md:w-1/3 sm:w-1/2 sm:mb-6">
                                    <span className="anchor sm:hidden" id="PAN"></span>
                                    <h4 className="text-font-200 uppercase text-base mb-2 font-bold sm:text-s-14">PAN</h4>
                                    <small className="text-s-20 text-font-500 font-medium sm:text-base">{gstNumber.slice(2, 12)}</small>
                                </div>
                                <div className="w-full mb-12 pr-5 md:w-1/3 sm:w-1/2 sm:mb-6">
                                    <span className="anchor sm:hidden" id="Address"></span>
                                    <h4 className="text-font-200 uppercase text-base mb-2 font-bold sm:text-s-14">GSTIN / UIN Status</h4>
                                    <small className="text-s-20 text-font-500 font-medium sm:text-base">{gstDetails.lstAppSCommonSearchTPResponse[0].sts}</small>
                                </div>
                                <div className="w-full mb-12 pr-5 md:w-1/3 sm:w-1/2 sm:mb-6">
                                    <span className="anchor sm:hidden" id="Address"></span>
                                    <h4 className="text-font-200 uppercase text-base mb-2 font-bold sm:text-s-14">Address</h4>
                                    <small className="text-s-20 text-font-500 font-medium sm:text-base">{getAddressString(gstDetails.lstAppSCommonSearchTPResponse[0].pradr.addr)}</small>
                                </div>
                                <div className="w-full mb-12 pr-5 md:w-1/3 sm:w-1/2 sm:mb-6">
                                    <span className="anchor sm:hidden" id="Entity Type"></span>
                                    <h4 className="text-font-200 uppercase text-base mb-2 font-bold sm:text-s-14">Constitution of Business</h4>
                                    <small className="text-s-20 text-font-500 font-medium sm:text-base">{gstDetails.lstAppSCommonSearchTPResponse[0].ctb}</small>
                                </div>
                                <div className="w-full mb-12 pr-5 md:w-1/3 sm:w-1/2 sm:mb-6">
                                    <span className="anchor sm:hidden" id="Nature of business"></span>
                                    <h4 className="text-font-200 uppercase text-base mb-2 font-bold sm:text-s-14">Nature of business</h4>
                                    <small className="text-s-20 text-font-500 font-medium sm:text-base">{gstDetails.lstAppSCommonSearchTPResponse[0].nba[0]}</small>
                                </div>
                                <div className="w-full mb-12 pr-5 md:w-1/3 sm:w-1/2 sm:mb-6">
                                    <span className="anchor sm:hidden" id="Pincode"></span>
                                    <h4 className="text-font-200 uppercase text-base mb-2 font-bold sm:text-s-14">Pincode</h4>
                                    <small className="text-s-20 text-font-500 font-medium sm:text-base">{gstDetails.lstAppSCommonSearchTPResponse[0].pradr.addr.pncd}</small>
                                </div>
                                <div className="w-full mb-12 pr-5 md:w-1/3 sm:w-1/2 sm:mb-6">
                                    <span className="anchor sm:hidden" id="Department Code"></span>
                                    <h4 className="text-font-200 uppercase text-base mb-2 font-bold sm:text-s-14">Department Code</h4>
                                    <small className="text-s-20 text-font-500 font-medium sm:text-base">{gstDetails.lstAppSCommonSearchTPResponse[0].ctj}</small>
                                </div>
                                <div className="w-full mb-12 pr-5 md:w-1/3 sm:w-1/2 sm:mb-6">
                                    <span className="anchor sm:hidden" id="Registration Type"></span>
                                    <h4 className="text-font-200 uppercase text-base mb-2 font-bold sm:text-s-14">Registration Type</h4>
                                    <small className="text-s-20 text-font-500 font-medium sm:text-base">{gstDetails.lstAppSCommonSearchTPResponse[0].dty}</small>
                                </div>
                                <div className="w-full mb-12 pr-5 md:w-1/3 sm:w-1/2 sm:mb-6">
                                    <span className="anchor sm:hidden" id="Registration Date"></span>
                                    <h4 className="text-font-200 uppercase text-base mb-2 font-bold sm:text-s-14">Registration Date</h4>
                                    <small className="text-s-20 text-font-500 font-medium sm:text-base">{gstDetails.lstAppSCommonSearchTPResponse[0].rgdt}</small>
                                </div>
                                <div className="w-full mb-12 pr-5 md:w-1/3 sm:w-1/2 sm:mb-6">
                                    <span className="anchor sm:hidden" id="Registration Date"></span>
                                    <h4 className="text-font-200 uppercase text-base mb-2 font-bold sm:text-s-14">Last Updated</h4>
                                    <small className="text-s-20 text-font-500 font-medium sm:text-base">{gstDetails.lstAppSCommonSearchTPResponse[0].lstupdt}</small>
                                </div>

                            </div>
                        }
                        {gstDetails && <div className="flex gap-y-10 items-center  flex-wrap my-12 mx-auto w-[95%] md:w-[90%]">
                            <label htmlFor="" className="text-s-20 text-font-500 font-medium sm:text-base"> Select a Financial Year : </label>
                            <div className="relative inline-block text-left w-56 ml-4">
                                <select name="FinYear" id="" placeholder='Select a Year' className="block  w-32 bg-white border border-gray-300 hover:border-gray-400  py-2 px-1 rounded shadow leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline" onChange={(e) => {
                                    fetchFiling(e.target.value);
                                }}>
                                    {allfin.map((item, i) => {
                                        return <option value={item} key={'rgdt-' + i} className="bg-gray-200">{item}</option>;
                                    })}

                                </select>
                            </div>
                        </div>}

                        {loadingFilDetails ? <Spinner state={loadingFilDetails} /> : filingDet && Object.keys(filingDet).length !== 0 && <div className="flex gap-y-10 items-start justify-between flex-wrap my-12 mx-auto md:w-[90%] w-[95%]">
                            {

                                Object.keys(filingDet).map((item) => {
                                    return <div className="relative overflow-x-auto shadow-md sm:rounded-lg" key={item}>
                                        <h1 className="m-2 text-lg font-bold">Period :   | {item}</h1>
                                        <table className="w-full text-lg text-left rtl:text-right text-gray-500">
                                            <thead className="text-sm text-gray-700 uppercase bg-gray-50 ">
                                                <tr>

                                                    <th scope="col" className="px-6 py-3">
                                                        Tax Period
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Date of Filing
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Status
                                                    </th>

                                                </tr>
                                            </thead>
                                            {filingDet[item].map(i => (

                                                <tbody key={i.arn} className="text-sm">
                                                    <tr className="odd:bg-white even:bg-gray-50  border-b ">

                                                        <td className="px-6 py-2">
                                                            {gstRet.includes(item) ? Months[parseInt(i.ret_prd.slice(0, 2)) - 1] : taxPeriod[item]}
                                                        </td>
                                                        <td className="px-6 py-2">
                                                            {i.dof}
                                                        </td>
                                                        <td className="px-6 py-2 font-bold">
                                                            {i.status}
                                                        </td>

                                                    </tr>
                                                </tbody>
                                            ))}
                                        </table>
                                    </div>
                                })}
                            <div className="w-full">
                                <button className="bg-blue-500 z-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => setModalIsOpen(true)}
                                >
                                    Download PDF
                                </button>
                            </div>

                        </div>}

                        <Content />


                    </div>

                </div>
            </div >



        </>
    )
}

export default TaxPayer