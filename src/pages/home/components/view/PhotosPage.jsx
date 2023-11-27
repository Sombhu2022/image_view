import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const PhotosPage = () => {
	const [images, setImages] = useState([]);

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
	}, []);

	return (
		<div>
			{images &&
				images.allImages?.map((img, index) => (
					<div key={index}>
						<div>
							<img src={img.url} className='show-image' />
						</div>
						<div>
							<p>{img.caption}</p>

							<button>Delete</button>
						</div>
					</div>
				))}
		</div>
	);
};

export default PhotosPage;
