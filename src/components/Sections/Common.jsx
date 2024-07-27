
const Common = () => {
    return (
        <section className='lg:p-20 p-8 space-y-3'>
            <div className='lg:w-1/2 space-y-3'>

            <h2 className="text-primary font-manrope font-semibold uppercase ">How It Works</h2>
            <h1 className=' text-5xl font-manrope font-bold'>How to Use Our Infographic Templates</h1>
            <p className='text-paragraph text-base '>Using our infographic templates is a breeze. Follow these simple steps to select, customize, and download the perfect template for your needs. Enhance your presentations and client interactions with minimal effort.</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div className='space-y-3'>
                    <div className='flex items-center '>
                        <div className=' bg-[#237BFF] w-20 h-20 rounded-full flex justify-center items-center font-manrope text-5xl font-black text-white'>01</div>
                        <div className='flex-grow dotted border-[2px] border-dashed' />
                    </div>
                    <div className='space-y-3'>
                        <h2 className='font-manrope text-xl font-semibold'>Select the Category</h2>
                        <p className='font-dmsans text-paragraph'>Start by choosing the category that best fits your needs. Whether it&apos;s accounting, tax, audit, or special occasions, we&apos;ve got you covered.</p>
                    </div>
                </div>
                <div className='space-y-3'>
                    <div className='flex items-center '>
                        <div className=' bg-[#237BFF] w-20 h-20 rounded-full flex justify-center items-center font-manrope text-5xl font-black text-white'>02</div>
                        <div className='flex-grow dotted border-[2px] border-dashed' />
                    </div>
                    <div className='space-y-3'>
                        <h2 className='font-manrope text-xl font-semibold'>Select the Poster Template</h2>
                        <p className='font-dmsans text-paragraph'>Browse through our collection of templates within the chosen category. Preview and select the one that suits your requirements.</p>
                    </div>
                </div>
                <div className='space-y-3'>
                    <div className='flex items-center '>
                        <div className=' bg-[#237BFF] w-20 h-20 rounded-full flex justify-center items-center font-manrope text-5xl font-black text-white'>03</div>
                        <div className='flex-grow dotted border-[2px] border-dashed' />
                    </div>
                    <div className='space-y-3'>
                        <h2 className='font-manrope text-xl font-semibold'>Download or Share</h2>
                        <p className='font-dmsans text-paragraph'>Customize your selected template, then download it in high-resolution format or share it directly via email and WhatsApp.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Common
