import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const MobileNav = () => {
    const role = useSelector((state)=>state.auth.role);
    return (
        <>
        {role === "user" && <div className='w-full items-center lg:hidden justify-between flex mt-4'>
            <Link
                to = '/profile'
                className='text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 rounded transition-all duration-300'
            >
                Favourites
            </Link>
            <Link
                to = '/profile/orderHistory'
                className='text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 rounded transition-all duration-300'
            >
                Order History
            </Link>
            <Link
                to = '/profile/settings'
                className='text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 rounded transition-all duration-300'
            >
                Settings
            </Link>
        </div>}
        {role === "admin" && <div className='w-full items-center lg:hidden justify-between flex mt-4'>
            <Link
                to = '/profile'
                className='text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 rounded transition-all duration-300'
            >
                All Orders
            </Link>
            <Link
                to = '/profile/add-book'
                className='text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 rounded transition-all duration-300'
            >
                Add Book
            </Link>
        </div>}
        </>
    )
}

