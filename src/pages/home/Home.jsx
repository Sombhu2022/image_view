import { useEffect, useState } from "react";
import "./home.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Upload from "./components/upload/Upload";
import toast from "react-hot-toast";

const Home = () => {
	const [images, setImages] = useState([]);
	const navigete = useNavigate();

	const UploadImage = () => {
		navigete("/upload");
	};

	const getImages = async () => {
		try {
			const { data } = await axios.get(`http://localhost:8080/api/images`,{
				headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,});

			  if(data.message === 'not login'){
				toast.error('Login first')
				navigete('auth/login')
			  }
            
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
	const userLogout = async ()=>{
		try {
			const { data } = await axios.get(`http://localhost:8080/auth/logout`,{
				headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,});

			toast.success(data.message)
			navigete('/auth/login')
		} catch (error) {
			console.error(error);
		}

	}

	return (
		<div>
			<button className="logout-button" onClick={userLogout}>Logout</button>
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

								<div className="option">
									<Link className="link" to={`/${img._id}`}>🌐</Link>
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
		</div></div>
	);
};

export default Home;
