import React, { useEffect, useState } from 'react';
import { SideBar } from './../components/Profile/SideBar';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Loader } from '../components/Loader/Loader';
import { MobileNav } from '../components/Profile/MobileNav';

export const Profile = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [Profile, setProfile] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    try{
        const fetch = async() => {
            const res = await axios.get(
                "http://localhost:1000/api/v1/get-user-information",
                {headers}
            );
            setProfile(res.data);
        };
        fetch();
    }catch(err){
        console.error(err);
    }
}, [Profile]);
  return (
    <div className='bg-zinc-900 px-2 md:px-12 flex md:flex-row flex-col py-8 gap-4 text-white'>
      {!Profile && 
        <div className='w-full h-[100%] flex items-center justify-center'><Loader/></div>
      }
      {Profile && <>
        <div className='w-full md:w-1/6 h-auto lg:h-screen'>
          <SideBar data = {Profile} />
          <MobileNav/>
        </div>
        <div className='w-full md:w-5/6'>
          <Outlet />
        </div>
      </>}
    </div>
  );
};
