import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';

const Movie = ({ item }) => {
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { user } = UserAuth();

  const movieID = doc(db, 'users', `${user?.email}`);

  const saveShow = async () => {
    if (user?.email) {
      setLike(!like);
      setSaved(true);
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id: item.id,
          title: item.title,
          img: item.backdrop_path,
        }),
      });
    } else {
      alert('Please log in to save a movie');
    }
  };

  const handleHeartClick = (e) => {
    e.stopPropagation(); // prevent the click event from bubbling up to the parent button
    saveShow();
  };

  const handleButtonClick = () => {
    setShowModal(true);
  };

  return (
    <div className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'>
      <img
        className='w-full h-auto block'
        src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
        alt={item?.title}
      />
      <div className='absolute top-0 left-0 w-full h-full text-white'>
        <button className='w-full h-full text-left focus:outline-none' onClick={handleButtonClick}>
          <p
            className='text-red-50 whitespace-pre-line text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'
            style={{ textShadow: '0px 2px 4px rgba(34,0,34,0.7)' }}
          >
            {item?.title}
          </p>
          <p>
            {like ? (
              <FaHeart className='absolute top-4 right-4 text-gray-300' onClick={handleHeartClick} />
            ) : (
              <FaRegHeart className='absolute top-4 right-4 text-gray-300' onClick={handleHeartClick} />
            )}
          </p>
        </button>
      </div>

      {showModal && (
        <div className='fixed top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center z-50'>
          <div className='bg-white p-4 rounded rounded-md w-80' style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' }}>
            <h2 className='text-lg font-bold mb-2 p-2 w-9 pl-0'>{item?.title}</h2>
            <p className='text-sm mb-4 whitespace-pre-line'>{item?.overview}</p>
            <button className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700' onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movie;
