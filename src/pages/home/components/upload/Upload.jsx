import { useEffect, useState } from "react";
import "./upload.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Upload = ({ reloadParentPage }) => {
	const [imageData, setImageData] = useState("/vite.svg");
	const [caption, setCaption] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleImageUpload = (event) => {
		const file = event.target.files[0];

		if (file) {
			// Use a FileReader to read the selected image file
			const reader = new FileReader();

			reader.onload = function (e) {
				// Set the result of the FileReader to the state variable
				setImageData(e.target.result);
			};

			reader.readAsDataURL(file);
		} else {
			// Clear the state variable if no file is selected ..
			setImageData(null);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const myForm = new FormData();
		myForm.set("imageData", imageData);
		myForm.append("caption", caption);
		setLoading(true);
		try {
			const { data } = await axios.post(
				`http://localhost:8080/api/images`,
				myForm,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
					withCredentials: true,
				}
			);

			setLoading(false);
			setCaption("");
			setImageData("/vite.svg");
			navigate("/");
		} catch (error) {
			setLoading(false);
		}
	};

	return (
		<>
			<div className='form-container'>
				<form action='' onSubmit={handleSubmit}>
					<label className='label' htmlFor='file'>
						<img id='image' className='input-image' src={imageData} alt='' />
						<h3>Select Image</h3>
					</label>
					<hr />
					<input
						hidden
						className='file'
						type='file'
						name='file'
						id='file'
						accept='image/*'
						onChange={handleImageUpload}
					/>

					<br></br>
					<h3>Enter a description</h3>

					<textarea
						className='caption'
						name='caption'
						placeholder='Type...'
						onChange={(e)=>setCaption(e.target.value)}
						value={caption}
						id=''
						cols='30'
						rows='10'
					></textarea>

					<button
						className='submit'
						type='submit'
						disabled={loading}
					>
						{" "}
						{loading ? "Uploading..." : "Upload"}
					</button>
				</form>
			</div>

			<div className='show-data'></div>
		</>
	);
};

export default Upload;
