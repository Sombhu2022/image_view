import { useState } from "react";
import "./upload.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import demoImage from "./demoImage.jpg";

const Upload = () => {
	const [imageData, setImageData] = useState(demoImage);
	const [caption, setCaption] = useState();
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

	function captionHandle(event) {
		//console.log(event.target.name)
		setCaption(event.target.value);
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
	  
		const myForm = new FormData();
	  
		myForm.set("imageData", imageData);
		myForm.append("caption", caption);
		setLoading(true); // Set loading to true here
	  
		try {
		  const config = { headers: { "Content-Type": "multipart/form-data" } };
	  
		  const { data } = await axios.post(
			`http://localhost:8080/api/images`,
			myForm,
			config
		  );
	  
		  // Set loading to false after the asynchronous operation is complete
		  setLoading(false);
	  
		  navigate("/");
	
		} catch (error) {
		  console.log(error);
		  setLoading(false); // Make sure to set loading to false in case of an error
		}
	  };

	return (
		<>
			<div className='form-container'>
				<form action='' onSubmit={handleSubmit}>
					<button className='submit' type='submit' value='submit' name='submit' disabled={loading} >
						{" "}
						{loading ? "Uploading..." : "Upload"}
					</button>
					<br></br>
					<input
						className='caption'
						type='text'
						required
						name='caption'
						placeholder='caption'
						onChange={captionHandle}
					/>

					<input
						hidden
						className='file'
						type='file'
						name='file'
						id='file'
						accept='image/*'
						onChange={handleImageUpload}
					/>
					<label className='label' htmlFor='file'>
						<img id='image' className='input-image' src={imageData} alt='' />
					</label>
				</form>
			</div>

			<div className='show-data'></div>
		</>
	);
};

export default Upload;
