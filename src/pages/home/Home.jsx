import { useEffect, useState } from "react";
import "./home.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Upload from "./components/upload/Upload";
import toast from "react-hot-toast";
import Bottom from '../lauout/bottom/Bottom'
import PhotosPage from "./components/view/PhotosPage";
import TextsPage from "./components/view/TextsPage";
const Home = () => {
	const [view, setView] = useState('p');

	const toggleView =(param)=>{
		setView(param)
	}












	
	const navigete = useNavigate();

	const UploadImage = () => {
		navigete("/upload");
	};

	

	const reloadPage = (reload) => {
		if (reload) {
			getImages();
		}
	};

	
	const optionHandaler = () => {};
	const userLogout = async () => {
		try {
			const { data } = await axios.get(`http://localhost:8080/auth/logout`, {
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
			});

			toast.success(data.message);
			navigete("/auth/login");
		} catch (error) {
			console.error(error);
		}
	};

	return (

		<>
		<div className="home-container">
			<div className={`${view ==="p"? "open" :""} photo-container`}>
				<PhotosPage />
			</div>
			<div className={`${view==="t"? "open" :""} text-container`}>
				<TextsPage/>
			</div>
		</div>
		<Bottom toggleView={toggleView}/>
		</>
		// <div>
		// 	<button className='logout-button' onClick={userLogout}>
		// 		Logout
		// 	</button>
		// 	<div className='container'>
		// 		{/* <div className='left'>
		// 		<Upload  reloadParentPage={reloadPage} />
		// 	</div> */}
		// 		<div className='right' id='images'>
		// 			{images &&
		// 				images.allImages?.map((img, index) => (
		// 					<div className='data-container' key={index}>
		// 						<div>
		// 							<img src={img.url} className='show-image' />
		// 						</div>
		// 						<div>
		// 							<p>{img.caption}</p>

		// 							<div className='option'>
		// 								<Link className='link' to={`/${img._id}`}>
		// 									🌐
		// 								</Link>
		// 							</div>
		// 						</div>
		// 					</div>
		// 				))}
		// 		</div>
		// 	</div>
		// </div>
	);
};

export default Home;
