import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Loader } from '../components/Loader/Loader'
import { BookCard } from '../components/BookCard/BookCard'

export const AllBooks = () => {
    const [Data,setData] = useState([]);
    useEffect(() => {
        try{
            const fetch = async() => {
                const res = await axios.get(
                    "http://localhost:1000/api/v1/get-all-books"
                );
                console.log(res.data);
                setData(res.data.data);
            };
            fetch();
        }catch(err){
            console.error(err);
        }
    }, []);
    // console.log(Data);
    return(
        <div className='bg-zinc-900 auto px-12 py-8'>
          {" "}
          <h4 className='text-3xl text-yellow-100'>All Books</h4>
            {!Data && 
                <div className='flex items-center justify-center my-8'> 
                    <div className='w-full h-[100%] flex items-center justify-center'>
                        <Loader/>{" "}
                    </div>
                </div>
            }
            <div className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4'>
              
                {Data && Data.map((items,i) => (<div key = {i}>
                    <BookCard data = {items}/>{" "}
                </div>))
                }
            </div>
        </div>
    )
}
