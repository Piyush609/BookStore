import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BookCard } from '../BookCard/BookCard';

export const Favourites = () => {
    const [FavouritesBooks, setFavouritesBooks] = useState();
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    useEffect(()=>{
        const fetch = async () => {
            const res = await axios.get("http://localhost:1000/api/v1/get-favourite-books",{headers});
            setFavouritesBooks(res.data.data);
        }
        fetch();
    },[FavouritesBooks]);
    return (
        <>
            {FavouritesBooks && FavouritesBooks.length === 0 && <div className='h-[100%] text-5xl font-semibold text-zinc-500 flex items-center justify-center flex-col w-full'>
                No Favourites Books
                
              <img src="./star.png" alt="" 
              className='h-[20vh] my-8'
              />
            </div>}
            <div className='grid grid-cols-4 gap-4'>

                {FavouritesBooks && <div className='h-[100%] text-5xl font-semibold text-zinc-500 flex items-center justify-center flex-col w-full'>
                        Favourites Books
                </div> && FavouritesBooks.map((items, i) => 
                    (
                        <div key = {i}>
                            <BookCard data = {items} favourite = {true}/>
                        </div>
                    )

                )}
            </div>
        </>
    )
}
