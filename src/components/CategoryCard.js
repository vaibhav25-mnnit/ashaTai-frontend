import React from 'react'
import './styles/CategoryCard.css'
import { Link } from 'react-router-dom'

function CategoryCard({ heading = 'samle heading', image_src = 'https://images.unsplash.com/photo-1682687220777-2c60708d6889?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' }) {
    return (


        <div data-aos='zoom-in' data-aos-duration="1000" >
            <Link to='#' className="
        light-shadow 
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
        dark:shadow-lg
        ">
                <div className="category-container">
                    <img
                        alt={heading}
                        src={image_src}
                        className="category-image"
                    />
                </div>
                <h1 className="font-semibold uppercase ">{heading}</h1>
            </Link>
        </div>
    )
}

export default CategoryCard