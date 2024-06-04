
import iconcheck from '../assets/img/Frame.svg'
import clipboard from '../assets/img/clipboard.svg'
import award from '../assets/img/award.svg'
import credit from '../assets/img/credit-card.svg'
import img1 from '../assets/img/2a22aa4e006bea9ca4c11ab8d6b8dc37.png'
const Content = () => {
    return (
        <>

            <div className=" mt-10 container flex justify-between items-center w-full flex-wrap">
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
