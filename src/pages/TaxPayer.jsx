import { useState } from "react";

const TaxPayer = () => {
    const taxpayer = 
            {
                RequestedGSTIN: '24AASFM9405H1ZZ',
                Message: 'Taxpayer details get successfully.',
                stjCd: 'GJ010',
                lgnm: 'MICROVISTA TECHNOLOGIES',
                stj: 'Ghatak 10 (Ahmedabad)',
                dty: 'Regular',
                cxdt: '',
                gstin: '24AASFM9405H1ZZ',
                nba: [
                    'Service Provision',
                    'Recipient of Goods or Services'
                ],
                lstupdt: '17/06/2019',
                rgdt: '01/07/2017',
                ctb: 'Partnership',
                sts: 'Cancelled',
                ctjCd: 'WS0604',
                ctj: 'RANGE IV',
                tradeNam: 'MICROVISTA TECHNOLOGIES',
                adadr: [
                    {
                        addr: null,
                        ntr: null
                    }
                ],
                pradr: {
                    addr: {
                        bnm: 'Ashirwad complex',
                        st: 'Opp. Sardar Patel Seva Samaj Hall, Mithkhali Six roads',
                        loc: 'Ellisbridge',
                        bno: '11',
                        stcd: 'Gujarat',
                        flno: '',
                        lt: '',
                        lg: '',
                        pncd: '380006'
                    },
                    ntr: null
                }
            }
        
    
    const [gstNumber, setGSTNumber] = useState('');
    const [isValid, setIsValid] = useState(false);

    const verifyGSTNumber = (gst) => {

        const gstRegex = /^(\d{2})([A-Z]{5})(\d{4})([A-Z]{1})(\d{1})([A-Z\d]{1})([A-Z\d]{1})$/;
        if (gstRegex.test(gst)) {

            setIsValid(true);
        } else {
            setIsValid(false);
        }
    };

    const handleGstVerify = (e) => {
        setGSTNumber(e.target.value);
        verifyGSTNumber(e.target.value);
    };

    return (
        <>
            <div className="w-full bg-[#2d3dc5] p-2 md:p-8 ">
                <div className=" h-96 px-6 py-4 bg-white shadow-md container m-auto">

                    <h1 className="text-3xl font-bold">Search Taxpayer</h1>
                    <p className="text-lg mt-3">GSTIN/UIN of the Taxpayer<span className="text-red-700 font-bold">*</span></p>
                    <input type="text" className="text-lg mt-2 w-full md:w-1/2 rounded-md p-2 border-solid border-2 border-[#828992]  "
                        placeholder="Enter the GSTIN/UIN of the Taxpayer" onChange={(e) => handleGstVerify(e)} />
                    {isValid && <p>Valid GST Number</p>}
                    {!isValid && gstNumber.length > 0 && <p className="text-red-600">Please enter a valid GST Number*</p>}
                    <div></div>
                    <button
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 mt-3 rounded-sm transition-colors duration-300 ${!isValid ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        disabled={!isValid}
                    >
                        Search
                    </button>

                </div>
                <div className="bg-gray-100 p-4 rounded-md shadow-md">
                    <h2 className="text-lg font-bold">Taxpayer Details</h2>
                    <div className="mt-4">
                        <p><span className="font-bold">GSTIN:</span> {taxpayer.RequestedGSTIN}</p>
                        <p><span className="font-bold">Legal Name:</span> {taxpayer.lgnm}</p>
                        <p><span className="font-bold">State Jurisdiction:</span> {taxpayer.stj}</p>
                        <p><span className="font-bold">Type:</span> {taxpayer.dty}</p>
                        <p><span className="font-bold">Registration Date:</span> {taxpayer.rgdt}</p>
                        <p><span className="font-bold">Status:</span> {taxpayer.sts}</p>
                        <p><span className="font-bold">Constitution:</span> {taxpayer.ctb}</p>
                        <p><span className="font-bold">Trade Name:</span> {taxpayer.tradeNam}</p>
                        <p><span className="font-bold">Last Update Date:</span> {taxpayer.lstupdt}</p>
                        <p><span className="font-bold">Nature of Business Activities:</span></p>
                        <ul className="list-disc ml-4">
                            {taxpayer.nba.map((activity, index) => (
                                <li key={index}>{activity}</li>
                            ))}
                        </ul>
                        <p><span className="font-bold">Principal Address:</span></p>
                        <div className="ml-4">
                            <p><span className="font-bold">Building Name:</span> {taxpayer.pradr.addr.bnm}</p>
                            <p><span className="font-bold">Street:</span> {taxpayer.pradr.addr.st}</p>
                            <p><span className="font-bold">Locality:</span> {taxpayer.pradr.addr.loc}</p>
                            <p><span className="font-bold">Building/Flat Number:</span> {taxpayer.pradr.addr.bno}</p>
                            <p><span className="font-bold">State:</span> {taxpayer.pradr.addr.stcd}</p>
                            <p><span className="font-bold">Postal Code:</span> {taxpayer.pradr.addr.pncd}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TaxPayer