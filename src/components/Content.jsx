
import iconcheck from '../assets/img/Frame.svg'
import clipboard from '../assets/img/clipboard.svg'
import award from '../assets/img/award.svg'
import credit from '../assets/img/credit-card.svg'
import img1 from '../assets/img/2a22aa4e006bea9ca4c11ab8d6b8dc37.png'
const Content = () => {
    return (
        <>
            <div className="md:w-11/12 flex flex-col justify-center m-auto">

                <h1 className="text-3xl font-bold text-left my-4">What is GSTIN?</h1>

                <p className="text-lg mt-3">GSTIN is the GST identification number or GST number. A GSTIN is a 15-digit PAN-based unique identification number allotted to every registered person under GST. As a GST-registered dealer, you might want to do a GST verification before entering it into your GST Returns. You can use the GST number check tool to do GST number (GSTIN) verification.</p>

                <div className="p-5 bg-[#effeff] rounded-xl border-2 border-cyan-400  my-4 ">

                    <p className="text-lg mt-3 md:w-4/5">
                        <strong className='text-sky-600'>Pro Tip: </strong>
                        <span className="null"> To ensure you never enter an invalid GSTIN on your returns, try the </span>
                        <strong>built-in validations</strong>
                    </p>

                    <p className="text-lg mt-3 md:w-4/5">
                        There can be multiple GSTINs for a single person with a PAN, being an assessee under the Income Tax Act. A GSTIN is obtained for every state or Union Territory from which such a person operates. It becomes compulsory to obtain GSTIN when the person crosses the threshold limit for GST registration by registering himself under GST.
                    </p>

                    <p className="text-lg mt-3 md:w-4/5">
                        Unlike the previous indirect tax regime where multiple registration numbers were present for different laws such as Excise, Service Tax and VAT, GSTIN is a single registration number under GST.
                    </p>
                </div>
            </div>
            <div className="md:w-11/12 m-auto mt-10 container flex justify-between items-center flex-wrap">
                <div className='md:w-1/2 '>
                    <h2 className="text-4xl font-bold mb-2 ">Why is it Necessary to <br />Verify the GST Number?</h2>
                    <div>
                        <img src={img1} alt="" className='md:w-[80%]' />
                    </div>
                </div>
                <div className='mt-4 md:mt-2 md:w-1/2 flex flex-wrap gap-y-4'>
                    <div className='md:w-1/2 p-3'>
                        <div className='bg-[#48b2b9] w-16 h-16 flex justify-center items-center rounded-3xl'>
                            <img src={iconcheck} alt="" className='w-7' />
                        </div>
                        <h1 className='font-bold font-[Poppins] my-1'>Verification</h1>
                        <p>Verify the legitimacy of businesses to prevent fraud and ensure accurate tax filing, and get real-time confirmation of a GSTIN&apos;s validity with the latest business details.</p>
                    </div>
                    <div className='md:w-1/2 p-3'>
                        <div className='bg-[#48b2b9] w-16 h-16 flex justify-center items-center rounded-3xl'>
                            <img src={award} alt="" className='w-7' />
                        </div>
                        <h1 className='font-bold font-[Poppins] my-1'>Transparency</h1>
                        <p>Enhance business transparency by verifying GST information, prevent GST number fraud at the start of transactions, and rectify any GSTIN errors promptly.</p>
                    </div>
                    <div className='md:w-1/2 p-3'>
                        <div className='bg-[#48b2b9] w-16 h-16 flex justify-center items-center rounded-3xl'>
                            <img src={credit} alt="" className='w-7' />
                        </div>
                        <h1 className='font-bold font-[Poppins] my-1'>Tax Credits</h1>
                        <p>Ensure accurate input tax credit claims and correct buyer credits.</p>
                    </div>
                    <div className='md:w-1/2 p-3'>
                        <div className='bg-[#48b2b9] w-16 h-16 flex justify-center items-center rounded-3xl'>
                            <img src={clipboard} alt="" className='w-7' />
                        </div>
                        <h1 className='font-bold font-[Poppins] my-1'>Invoicing</h1>
                        <p>Avoid incorrect invoices by verifying GSTINs on both digital and physical invoices.</p>
                    </div>
                </div>

            </div>
            <h2 className="text-4xl font-bold mt-16 text-center">GST Identification Number Format.</h2>
            <div className="mt-10  container  flex justify-around items-center w-full  flex-wrap-reverse ">
                <div className="">
                    <img src={'https://lh7-us.googleusercontent.com/eJCj82Sf13gelW7pbM1msSLQ53NF0sW9imIyfmwmmHnWO8USw6xdaFMGVIR4ht-4t0zDRIBIT37Hi42r1ri6xuqvEjPg6kXXJc9mnzPPrBKOZUyp7EsSFiI28yiG9KAFsHeTrC7LDfKEogtc4QAqIN8'} alt="" width={500} />
                </div>
                <div className=" ">
                    <p className="text-md mt-3 ml-3 leading-10 ">
                        <p className='font-bold mb-3'>Before verifying a GST number, ensure the 15-digit alphanumeric code follows this format:
                        </p>
                        <span className='text-sky-600 font-semibold text-lg'> First 2 Digits:</span> State code of the registered business. <br />
                        <span className='text-sky-600 font-semibold text-lg'>Next 10 Digits:</span> PAN of the registered business owner. <br />
                        <span className='text-sky-600 font-semibold text-lg'>13th Digit:</span>  Entity number, represents the number of registrations for the same PAN within the state. <br />
                        <span className='text-sky-600 font-semibold text-lg'>14th Character:</span> Always &apos;Z&apos;. <br />
                        <span className='text-sky-600 font-semibold text-lg'>Last Digit:</span> Checksum digit (letter or number) for error detection
                    </p>
                    <br />

                </div>
            </div>
        </>
    )
}

export default Content
