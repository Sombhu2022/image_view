import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./register.scss";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, selectUser } from "../../../redux/slices/authSlice";

function register() {
	const [user, setUser] = useState({});
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { isAuthenticated } = useSelector(selectUser);

	useEffect(() => {
		if (isAuthenticated === true) {
			navigate("/");
		}
	}, [dispatch, isAuthenticated, navigate]);

	const handleData = async (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const createNewUser = async (e) => {
		e.preventDefault();

		try {
			if (Object.entries(user).length == 0) {
				return toast.error("plese input valid data....");
			}
			if (!user.name || !user.email || !user.password) {
				return toast.error("name and email and password required....");
			}

			if (user.password.length < 8) {
				return toast.error("password must be 8 characters....");
			}

			if (user.password != user.cpassword) {
				return toast.error("password and confirm password are not match...");
			}

			dispatch(registerUser(user));
		} catch (error) {
			console.error("err", error);
			toast.error(error.response.data.message);
		}
	};

	return (
		<div>
			<form action='' className='auth-form' onSubmit={createNewUser}>
				<b style={{ fontSize: "25px" }}>registration form </b>
				<input
					type='name'
					placeholder='enter fullname '
					name='name'
					onChange={handleData}
				/>
				<input
					type='email'
					name='email'
					id='email'
					placeholder='enter Email'
					onChange={handleData}
				/>
				<input
					type='password'
					name='password'
					id='pass1'
					placeholder='enter password '
					onChange={handleData}
				/>
				<input
					type='password'
					name='cpassword'
					id='pass2'
					placeholder='enter  confirm password'
					onChange={handleData}
				/>
				<button type='submit'> Register </button>
				<hr />
				<b>You have alrady register </b>
				<Link to={"/login"}>
					{" "}
					<button> Log in </button>{" "}
				</Link>
			</form>
		</div>
	);
}

export default register;
