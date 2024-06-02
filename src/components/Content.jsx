
const Content = () => {
    return (
        <>
            <div className=" mt-10 container flex justify-between items-center w-full m flex-wrap">
                <div className=" md:w-7/12">
                    <h2 className="text-xl font-bold mb-2">GST - the Goods and Services Tax</h2>
                    <p className="text-md mt-3 ">
                        <b>Trustworthy Business Partners</b>: Verify the legitimacy of businesses you deal with to prevent fraud and ensure accurate tax filing. <br />
                        <b>Up-to-date Information:</b> Get real-time confirmation of a GSTIN&apos;s validity and access the latest business details. <br />
                        <b>Accurate Invoicing:</b> Avoid issuing incorrect invoices or e-invoices by verifying GSTINs on both digital and physical invoices. <br />
                        <b>Claim Tax Credits Correctly:</b> Ensure you claim input tax credits accurately and credit the right buyers. <br />
                        <b>Transparent Transactions:</b> Enhance business transparency by verifying GST information, leading to accurate GST return filing. <br />
                        <b>Fraud Prevention:</b> Identify and prevent GST number fraud at the beginning of transactions. <br />
                        <b>Error Correction:</b> Catch and rectify any errors in the GSTIN to avoid future issues.</p>
                </div>
                <div className=" md:w-5/12">
                    <img style={{aspectRatio:2/1}} src={'https://lh7-us.googleusercontent.com/bm5L2zHvl-wELzgIhIowdejx2AaL_Qk99KuhmMTjjrI_jfXu_IcUcqCMdchn2ryNS9FSwVXCfhDYAlDluhHGTOnxERdYQ71u7VAUnn_QVewdpXj6jN-UwB5JjEXTE95Cdf5rEwTe4sjW4N6o8sHV5bc'} alt="" width={800} />
                </div>
            </div>
            <div className="mt-10  container  flex justify-between items-center w-full  flex-wrap-reverse ">
                <div className="">
                    <img src={'https://lh7-us.googleusercontent.com/eJCj82Sf13gelW7pbM1msSLQ53NF0sW9imIyfmwmmHnWO8USw6xdaFMGVIR4ht-4t0zDRIBIT37Hi42r1ri6xuqvEjPg6kXXJc9mnzPPrBKOZUyp7EsSFiI28yiG9KAFsHeTrC7LDfKEogtc4QAqIN8'} alt="" width={500} />
                </div>
                <div className=" ">
                    <h2 className="text-xl font-bold mb-2">GST Identification Number Format.</h2>
                    <p className="text-md mt-3 ml-3 leading-10 ">
                        <b> First 2 Digits:</b> State code of the registered business. <br />
                        <b>Next 10 Digits:</b> PAN of the registered business owner. <br />
                        <b>13th Digit:</b>  Entity number, represents the number of registrations for the same PAN within the state. <br />
                        <b>14th Character:</b> Always &apos;Z&apos;. <br />
                        <b>Last Digit:</b> Checksum digit (letter or number) for error detection
                    </p>
                    <br />

                </div>
            </div>
        </>
    )
}

export default Content
