import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import AccuWeather from './AccuWeather';

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  // console.log(user.email)

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='flex items-center justify-between p-4 z-[100] w-full absolute'>
      <div className='mt-0 pt-0 justify-start'>
      <AccuWeather />
    </div>
         
        <Link to='/'>
        <h1 className='text-red-600 text-5xl font-bold cursor-pointer ' style={{ textShadow: '0px 0px 10px #000000', paddingLeft:'10rem' }}>
           &nbsp;   NETFLIX
          </h1>
        </Link>

        {user?.email ? (
          <div>
            <Link to='/account'>
              <button className='text-white pr-4'>Account</button>
            </Link>
            <button
              onClick={handleLogout}
              className='bg-red-600 px-6 py-2 rounded cursor-pointer text-white'
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <Link to='/login'>
              <button className='text-white pr-4'>Sign In</button>
            </Link>
            <Link to='/signup'>
              <button className='bg-red-600 px-6 py-2 rounded cursor-pointer text-white'>
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
