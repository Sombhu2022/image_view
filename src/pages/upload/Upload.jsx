import { useState } from "react";
import "./upload.scss";
import axios from 'axios'

const Upload = () => {
	const [imageData, setImageData] = useState("/vite.svg");

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
			// Clear the state variable if no file is selected
			setImageData(null);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const myForm = new FormData();

		myForm.set("imageData", imageData);

		try {
			const config = { headers: { "Content-Type": "multipart/form-data" } };
			const { data } = await axios.post(`http://localhost:8080/api/images`, myForm, config);

      console.log(data)
		} catch (error) {
      console.log(error)
    }
	};

	return (
		<>
			<h2>Upload images</h2>

			{imageData && (
				<img
					src={imageData}
					alt='Image Preview'
					style={{ maxWidth: "100px" }}
				/>
			)}

			<form encType='multipart/form-data' onSubmit={handleSubmit}>
				<input type='file' accept='image/*' onChange={handleImageUpload} />
				<button type='submit'>Upload</button>
			</form>
		</>
	);
};

export default Upload;
