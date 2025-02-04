import React from 'react'
import { Link } from 'react-router-dom'

export const Hero = () => {
  return (
    <div className='h-[75vh] flex flex-col md:flex-row items-center justify-center'>
        <div className='w-full mb-12 md:mb-0 lg:w-3/6 flex-colitems-centre lg:items-starts justify-center'>
            <h1 className='text-4xl lg:text-6xl font-semibold text-yellow-100 text-center lg:text-left'>Discover Your Next Reads</h1>
            <p className='mt-4 text-xl text-zinc-300 text-center lg:text-left'>
                Uncover captivating stories, enriching knowledge, and endless
                inspiration in out curated collection of books
            </p>
            <div className='mt-8 flex justify-center items-center lg:justify-start'>
                <Link to = "/all-books" className='text-yellow-100 text-xl lg:text-2xl font-semibold border-yellow-100 px-10 py-3 hover:bg-zinc-800 border rounded-full'>Discover Books</Link>
            </div>
        </div>
        <div className='w-full lg:w-3/6 h-[100%] lg:h-[100%] flex items-centre justify-center'>
            <img src="/hero.png" alt="" />
        </div>
    </div>
  )
}
