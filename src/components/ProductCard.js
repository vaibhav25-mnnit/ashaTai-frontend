import React from 'react'
import './styles/ProductCard.css'
import { Link } from 'react-router-dom'

import img from '../images/2.png'

function ProductCard({ heading = 'samle heading', image_src = img }) {
    return (

        <div  >
            <Link to='#' className="light-shadow 
                                    h-full  w-auto 
                                    flex flex-col gap-3 items-center justify-center 
                                    overflow-visible 
                                    relative 
                                    rounded-2xl border  
                                    py-4  
                                    transition-transform duration-500 ease-in-out
                                    hover:scale-105
                                    dark:bg-gray-800
                                    dark:border
                                    dark:rounded-2xl
                                    dark:shadow-gray-500
                                    dark:shadow-lg">

                <div className="category-container">
                    <img
                        alt={heading}
                        src={image_src}
                        className=""
                    />
                </div>
                <h1 className="font-semibold uppercase ">{heading}</h1>
            </Link>
        </div>
    )
}

export default ProductCard