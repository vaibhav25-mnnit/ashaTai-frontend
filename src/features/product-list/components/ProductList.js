import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProducts } from '../productSlice';

export default function ProductList() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const status = useSelector((state) => state.products.status)

    useEffect(() => {
        dispatch(getProducts(1))
    }, [dispatch]);


    if (status === 'loading' || products === undefined) {
        return <div style={
            {
                display: 'flex',
                justifyContent: 'center',
            }
        }>
            <div
                className="flex h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span
                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                >Loading...</span>
            </div>
        </div>
    }

    return (

        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                    {products.map((product) => (

                        <Link key={product.id} to={`/product-detail/${product.id}`}>
                            <div className="group relative">
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                    <img
                                        src={product.thumbnail}
                                        alt={product.title}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm text-gray-700">
                                            <Link to={`/product-detail/${product.id}`}>
                                                <span aria-hidden="true" className="absolute inset-0" />
                                                {product.title}
                                            </Link>
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">{product.rating}</p>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">{product.price}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div >
    )
}
