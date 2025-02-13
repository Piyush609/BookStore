import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { BookCard } from './../BookCard/BookCard';
import { Loader } from './../Loader/Loader';

export const RecentlyAdded = () => {
    const [Data,setData] = useState([]);
    useEffect(() => {
        try{
            const fetch = async() => {
                const res = await axios.get(
                    "http://localhost:1000/api/v1/get-recent-books"
                );
                console.log(res.data);
                setData(res.data.data);
            };
            fetch();
        }catch(err){
            console.error(err);
        }
    }, []);
    console.log(Data);
    return (
        <div className='mt-8 px-4'>
            <h4 className='text-3xl text-yellow-100'>Recently Added Books</h4>
            {!Data && 
                <div className='flex items-center justify-center my-8'> <Loader/>{" "}
                </div>
            }
            <div className='my-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4'>
               
                {Data && Data.map((items,i) => (<div key = {i}>
                    <BookCard data = {items}/>{" "}
                </div>))
                }
            </div>
        </div>
    )
}
