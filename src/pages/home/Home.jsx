import { useEffect, useState } from 'react';
import './home.scss';
import axios from 'axios';
import Upload from '../upload/Upload';

const Home = () => {
  const [images, setImages] = useState([]);

  const getImages = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/images`);
      setImages(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getImages();
  }, []);

  return (
    <div>


<Upload /> 

      <h1 className='home-heading'>Welcome to CloudGallery</h1>
      {images && images.allImages?.map((img, index) => (
        <img
          key={index}
          src={img.url}
          alt='Image Preview'
          style={{ maxWidth: "100px" }}
        />
      ))}
    </div>
  );
}

export default Home;
