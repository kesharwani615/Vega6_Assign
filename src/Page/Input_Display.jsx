/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Input_Display = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    try {
      const response = await axios.get(`https://api.unsplash.com/search/photos?page=1&query=${searchQuery}&client_id=tseQLucxq_qfiPftY1zldz0K65FXaLzzq08rKrXgIqc`);
      console.log(response.data.results);
      setImages(response.data.results);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  useEffect(() => {
    console.log(images);
  }, [images]);

  return (
    <>
    <div>
      <p className='flex gap-2'> Name: - <h2> Shivam Kesharwani </h2></p>
      <p className='flex gap-2'> Email : - <h2> kesharwanishivam615@gmail.com </h2></p>
    </div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Image Caption App</h1>
        <div className="mb-4">
          <input
            type="text"
            className="border p-2 rounded w-full"
            placeholder="Search for images..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={fetchImages} className="bg-blue-500 text-white p-2 rounded mt-2">
            Search
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-4">
        {images.map((image) => (
          <div key={image.id} className="border p-2">
            <img src={image.urls.small} alt={image.alt_description} className="w-[21rem] h-60" />
            <Link
        to={`/Add_Caption/${encodeURIComponent(image.urls.small)}`}
        className="bg-green-500 text-white p-2 rounded mt-2 w-full block text-center"
            >
              Add Captions
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Input_Display;
