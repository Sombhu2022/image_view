import { useEffect, useState } from "react";
import "./home.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Upload from "./components/upload/Upload";

const Home = () => {
	const [images, setImages] = useState([]);
	const navigete = useNavigate();

	const UploadImage = () => {
		navigete("/upload");
	};

	const getImages = async () => {
		try {
			const { data } = await axios.get(`http://localhost:8080/api/images`);
			setImages(data);
		} catch (error) {
			console.error(error);
		}
	};

	const reloadPage =(reload)=>{
		if(reload){
			getImages();
		}
	}

	useEffect(() => {
		getImages();
	}, []);

	const optionHandaler = () => {};

	return (
		<div className='container'>
			<div className='left'>
				<Upload  reloadParentPage={reloadPage} />
			</div>
			<div className='right' id='images'>
				{images &&
					images.allImages?.map((img, index) => (
						<div className='data-container' key={index}>
							<div>
								<img src={img.url} className='show-image' />
							</div>
							<div>
								<p>{img.caption}</p>

								<div>
									<Link to={`/${img._id}`}>🌐</Link>
								</div>
							</div>
						</div>
					))}
			</div>

			{/* <h1 className='home-heading'>Welcome to CloudGallery</h1>
     <button name='add' className='addButton' onClick={UploadImage}>Upload New Image</button><br/>

      {images && images.allImages?.map((img, index) => (
        <div className='data-container' key={index} > 
               
        <div className='image-container'>

         <img src={img.url} className='show-image'/>
        </div>
        <div className='option-container'>
         
        <div className='show-caption'><p>{img.caption}</p></div>
         <div className='delete'><Link to={`/${img._id}`}>🌐</Link></div>
        </div>
            
        </div>
      ))} */}
		</div>
	);
};

export default Home;
