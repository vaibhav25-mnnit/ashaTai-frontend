import React from 'react'

import CategoryCard from './CategoryCard';
import img1 from '../images/1.png'
import img2 from '../images/2.png'
import img3 from '../images/3.png'
import img4 from '../images/4.png'
import img5 from '../images/5.png'
import img6 from '../images/6.png'
function Categories() {


    return (<>

        <div className='dark:bg-gray-900 dark:text-white flex flex-col py-5   items-center shadow-white '>
            <h1 className='text-2xl uppercase font-semibold tracking-tight my-4  sm:my-10 sm:text-4xl'>SHOP BY CATEGORIES</h1>

            <div className='flex overflow-auto sm:grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 p-5 gap-5 w-[90%] md:1/2 lg:w-2/3 '>
                <CategoryCard heading={"acchar's"} image_src={img1} />
                <CategoryCard heading={"chuttney's"} image_src={img2} />
                <CategoryCard heading={"laddo's"} image_src={img3} />
                <CategoryCard heading={'namkeen'} image_src={img4} />
                <CategoryCard heading={"pappad's"} image_src={img6} />
                <CategoryCard heading={"traditional's"} image_src={img5} />

            </div>
        </div>
    </>
    )
}

export default Categories