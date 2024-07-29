import { Link } from 'react-router-dom'
import Infographics from '../InfographicsGrid'

const TopPicks = () => {
    return (
        <>
        <section className='bg-background text-center py-10 space-y-6'>
            <h2 className="text-primary font-manrope font-semibold uppercase text-center">Top Picks</h2>
            <h1 className='text-center text-5xl font-manrope font-bold'>Most Used Infographic Templates</h1>
            <p className='text-paragraph text-base text-center lg:w-1/2 m-auto'>Discover the most popular infographic templates among accountants and tax professionals. These trending designs are highly downloaded and have proven to enhance client communication and engagement. </p>

            <Infographics category='TOP'/>

            <div className='flex justify-center'>
                <Link to="/infographics/search" className="px-5 py-4 bg-secondary text-white hover:bg-secondaryhover transition-colors rounded-full"> Explore All Templates</Link>
            </div>

        </section>
        </>
    )
}

export default TopPicks
