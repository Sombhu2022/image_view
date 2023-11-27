import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./photosPage.scss";

const PhotosPage = () => {
	const [images, setImages] = useState([]);
	const [update, setUpdate] = useState(false);


	const navigete = useNavigate();

	const getImages = async () => {
		try {
			const { data } = await axios.get(`http://localhost:8080/api/images`, {
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
			});

			if (data.message === "not login") {
				toast.error("Login first");
				navigete("auth/login");
			}

			setImages(data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getImages();
	}, [update]);

	const deleteImage = async (id) => {
		try {
			const {data} = await axios.delete(`http://localhost:8080/api/images/${id}`,{
				headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,})

			if(data.success === true ){
				setUpdate(!update)
			}
		} catch (err) {
			console.log(err);
		}``
	};

	
		const handleDownload = (imageUrl, fileName ) => {
		  fetch(imageUrl)
			.then((response) => response.blob())
			.then((blob) => {
			  const url = URL.createObjectURL(blob);
			  const a = document.createElement('a');
			  a.href = url;
			  a.download = fileName;
			  document.body.appendChild(a);
			  a.click();
			  document.body.removeChild(a);
			})
			.catch((error) => console.error('Error downloading image:', error));
		};
	

	return (
		<div className='photo-page-div'>
			{images &&
				images.allImages?.map((img, index) => (
					<div key={index}>
						<div>
							<img src={img.url} className='show-image' />
						</div>
						<div>
							<p>{img.caption}</p>
						</div>
						<div>
							<button onClick={()=>{deleteImage(img._id)}}>
								Delete <i className='fa-solid fa-trash'></i>
							</button>
							<button onClick={()=>{handleDownload(img.url, img.public_id)}}>
							Save <i className="fa-solid fa-download"></i>
							</button>
						</div>
					</div>
				))}
		</div>
	);
};

export default PhotosPage;
