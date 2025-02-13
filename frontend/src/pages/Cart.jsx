import React, { useEffect, useState } from 'react'
import { Loader } from '../components/Loader/Loader';
import axios from 'axios';
import {AiFillDelete} from "react-icons/ai"
import { useNavigate } from 'react-router-dom';

export const Cart = () => {
    const [Cart, setCart] = useState();
    const [Total, setTotal] = useState(0);
    const headers = {
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    useEffect(()=>{
      try{
        const fetch = async()=>{
          const res = await axios.get(
            "http://localhost:1000/api/v1/get-cart-books",
            {headers}
          );
          setCart(res.data.data);
          // console.log(res.data);
        }
        fetch();
      }catch(e){
        console.log(e);
      }
    },[Cart]);
    const deletItem = async (bookId) => {
      try{
        const res = await axios.put(`http://localhost:1000/api/v1/remove-from-cart/${bookId}`,
        {},
        {headers}
        );
        console.log(res);
      }catch(e){
        console.log(e);
      }
    };
    useEffect(() => {
      if(Cart && Cart.length > 0){
        let total = 0;
        Cart.map((items) => {
          total += items.price;
        });
        setTotal(total);
        total = 0;
      }
    },[Cart]);
    const navigate = useNavigate();
    const PlaceOrder = async() => {
      try{
        const res = await axios.post("http://localhost:1000/api/v1/place-order",
        {order:Cart},
        {headers});
        alert(res.data.message);
        navigate("/profile/orderHistory")
      }catch(err){
        console.log(err);
      }
    }
    return (
      <div className='bg-zinc-900 px-12 h-[100%] py-8'>
        {!Cart && 
        <div className='w-full h-[100%] flex items-center justify-center'>
          <Loader/>{" "}
          </div>
        }
        {Cart && Cart.length === 0 && (
          <div className='h-screen'>
            <div className='h-[100%] flex items-center justify-center flex-col'>
              <h1 className='text-5xl lg:text-6xl font-semibold text-zinc-400'>
                Empty Cart
              </h1>
              <img 
                src="/empty cart.png" 
                alt="empty cart" 
                className='lg:h-[50vh]'
              />
            </div>
          </div>
        )}
        {Cart && Cart.length > 0 && (
          <>
            <h1 className='text-5xl font-semibold text-zinc-500 mb-8'>
              Your Cart
            </h1>
            {Cart.map((items,i)=>(
              <div className='w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center' key = {i}>
                
                <img src={items.url} alt="/"
                  className='h-[20vh] md:h-[10vh] object-cover'
                />
                <div className='w-full md:w-auto'>
                  <h1 className='text-2xl text-zinc-100 font-semibold text-start lg:ms-4 mt-2 md:mt-0'>
                    {items.title}
                  </h1>
                </div>
                <div className='flex mt-4 w-full md:w-auto items-center justify-between'>
                  <span>
                  <h2 className='text-zinc-100 text-3xl font-semibold flex'>
                  <div>₹</div> {items.price}
                  </h2>
                  </span>
                  <button
                  className='bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12'
                  onClick={() => deletItem(items._id)}
                  >
                  <AiFillDelete/>
                  </button>
                </div>
              </div>
            ))}
          </>
        )}

          {Cart && Cart.length > 0 && (
                <div className='mt-4 w-full flex items-center justify-end'>
                  <div className='p-4 bg-zinc-800 rounded'>
                    <h1 className='text-3xl text-zinc-200 font-semibold'>
                      Total amount
                    </h1>
                    <div className='mt-3 flex items-center justify-between text-xl text-zinc-200'>
                      <h2>{Cart.length} books</h2>
                      <h2>₹ {Total}</h2>
                    </div>
                    <div className='w-[100%] mt-3'>
                      <button
                      className='bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-200'
                      onClick={PlaceOrder}
                      >
                        Place Your Order
                      </button>
                    </div>
                  </div>
                </div>
            )}
      </div>
    )
}
