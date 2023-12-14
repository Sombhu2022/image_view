import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "./photosPage.scss";
import { useDispatch, useSelector } from "react-redux";
import {
	allImages,
	deleteImage,
	selectImages,
} from "../../../../redux/slices/imageSlice";
import Loader from "../../../lauout/loader/Loader";

const PhotosPage = () => {
	const { images, postStatus, error } = useSelector(selectImages);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(allImages());
		if (error) {
			toast.error("Request failed!")
			
		}
	}, [error]);

	const deleteImageHandler = (id) => {
		dispatch(deleteImage(id));
	};

	const handleDownload = (imageUrl, fileName) => {
		fetch(imageUrl)
			.then((response) => response.blob())
			.then((blob) => {
				const url = URL.createObjectURL(blob);
				const a = document.createElement("a");
				a.href = url;
				a.download = fileName;
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
			})
			.catch((error) => console.error("Error downloading image:", error));
	};

	return (
		<div className='photo-page-div'>
			{images &&
				images.map((img, index) => (
					<div key={index}>
						<div>
							<img src={img.url} className='show-image' />
						</div>
						<div>
							<p>{img.caption}</p>
						</div>
						<div>
							<button
								onClick={() => {
									deleteImageHandler(img._id);
								}}
							>
								Delete <i className='fa-solid fa-trash'></i>
							</button>
							<button
								onClick={() => {
									handleDownload(img.url, img.public_id);
								}}
							>
								Save <i className='fa-solid fa-download'></i>
							</button>
						</div>
					</div>
				))}
			{postStatus === "loading" ? <Loader /> : ""}
		</div>
	);
};

export default PhotosPage;
