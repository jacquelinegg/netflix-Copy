import React, { useState, useEffect } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { updateDoc, doc, onSnapshot } from 'firebase/firestore';
import { AiOutlineClose } from 'react-icons/ai';

const SavedShows = () => {
const [movies, setMovies] = useState([]);
const [currentMovie, setCurrentMovie] = useState(null);
const [comment, setComment] = useState("");
const [showCommentModal, setShowCommentModal] = useState(true);


const { user } = UserAuth();

const slideLeft = () => {
var slider = document.getElementById('slider');
slider.scrollLeft = slider.scrollLeft - 500;
};
const slideRight = () => {
var slider = document.getElementById('slider');
slider.scrollLeft = slider.scrollLeft + 500;
};

useEffect(() => {
  onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
    setMovies(doc.data()?.savedShows);
  });
}, [user?.email]);

const movieRef = doc(db, 'users', `${user?.email}`)
const deleteShow = async (passedID) => {
try {
const result = movies.filter((item) => item.id !== passedID)
await updateDoc(movieRef, {
savedShows: result
})
} catch (error) {
console.log(error)
}
}

const addComment = async (passedID, comment) => {
  
  try {
    await updateDoc(movieRef, {
      savedShows: movies.map((item) =>
        item.id === passedID ? { ...item, comment } : item
      ),
    });
    setCurrentMovie(null);
    setComment("");
  } catch (error) {
    console.log(error);
  }
};

const updateComment = async (passedID, comment) => {
  try {
    await updateDoc(movieRef, {
      savedShows: movies.map(item => item.id === passedID ? { ...item, comment } : item)
    });
    setCurrentMovie(null);
    setComment('');
  } catch (error) {
    console.log(error);
  }
};

return (
<>
<h2 className='text-white font-bold md:text-xl p-4'>My Shows</h2>
<div className='relative flex items-center group'>
<MdChevronLeft
       onClick={slideLeft}
       className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
       size={40}
     />
<div
id={'slider'}
className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'
>
{movies.map((item) => (
<div
key={item.id}
className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'
onClick={() => setCurrentMovie(item)}
>
<img
className='w-full h-auto block'
src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
alt={item?.title}
/>
<div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
<p
  className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center cursor-pointer outline-none'
  onClick={() => {
    setCurrentMovie(item);
    setShowCommentModal(true);
  }}
>
  {item?.title}
  {item.comment && (
    <span className='text-xs ml-2 bg-red-500 text-white px-1 rounded'>
      Commented
    </span>
  )}
</p>





<p className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>
{item?.title}
</p>
<p onClick={() => { deleteShow(item.id); setShowCommentModal(false); }} className='absolute text-gray-300 top-4 right-4'><AiOutlineClose /></p>

</div>
</div>
))}

</div>

{showCommentModal && currentMovie && (
  <div className='fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50'>
    <div className='bg-gray-200 w-3/4 md:max-w-2xl rounded-lg shadow-lg overflow-y-auto'>
      <div className='flex justify-end'>
        <button
          className='text-3xl'
          onClick={() => setCurrentMovie(null)}
        >
          <AiOutlineClose />
        </button>
      </div>
      <div className=' pt-0 pl-3 pb-3 pr-3 mt-0'>
        <h2 className='text-2xl text-red-500 font-bold mb-6 '>
          {currentMovie.title}
        </h2>
        <img
          src={`https://image.tmdb.org/t/p/w500/${currentMovie.img}`}
          alt={currentMovie.title}
          className=' mb-4 w-70 ml-20'
        />
        {currentMovie.comment && (
          <div className="mb-4 flex items-center">
          <h3 className="font-bold mr-2">Comment:</h3>
          <p className="mr-2">{currentMovie.comment}</p>
          <button
            className="bg-red-500 text-white px-2 py-1 rounded"
            onClick={() => {
              updateComment(currentMovie.id, "");
            }}
          >
            Delete comment
          </button>
        </div>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addComment(currentMovie.id, comment);
          }}
          className='flex flex-col'
        >
          <textarea
            className='w-full border rounded-lg p-2 mb-2'
            placeholder='Add a comment...'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div style={{ display: 'flex' }}>
          {!currentMovie.comment  && (
          <button
            className='bg-red-500 text-white rounded-md px-4 py-2 mt-4 mr-2'
            onClick={() => addComment(currentMovie.id, comment)}
            disabled={!comment.trim()} 
          >
            Add comment
          </button>
          )}
          {currentMovie.comment && (
          <button
            className='bg-gray-500 text-white rounded-md px-4 py-2 mt-4'
            onClick={() => updateComment(currentMovie.id, comment)}
            disabled={!comment.trim()} // disable if comment is empty or contains only whitespace
          >
            Update
          </button>
          )}
        </div>
        
        </form>
      </div>
    </div>
  </div>
)}


<MdChevronRight
onClick={slideRight}
className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
size={40}
/>
</div>
</>

  );
};

export default SavedShows;
