import { useState } from "react";
import "./header.scss";
import { Link } from "react-router-dom";
import sani from "../../../assets/sani.jpg";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, selectUser } from "../../../redux/slices/auth";

const Header = () => {
	const [dp, setDp] = useState(sani);
	const [isOpen, setIsOpen] = useState(false);
	const dispatch = useDispatch();
	const { user } = useSelector(selectUser);

	const toggleOpen = () => {
		setIsOpen(!isOpen);
	};

	const userLogout = async () => {
		dispatch(logoutUser());
	};
	return (
		<div className='header-container'>
			<div className='header'>
				<div>
					<Link to={"/"}>
						<img className='img ' src={dp} alt='' />
					</Link>
				</div>
				<div>
					<Link className='upload-btn' to={"/upload"}>
						Upload <i className='fa-solid fa-cloud-arrow-up'></i>
					</Link>
					<Link onClick={toggleOpen} className='profile-options' to={"/"}>
						<img className='img' src={dp} alt='' />
					</Link>
					{user ? (
						<div
							onClick={toggleOpen}
							className={`${isOpen ? "open" : ""} options`}
						>
							<div onClick={userLogout}>
								<i className='fa-solid fa-right-from-bracket'></i> Logout
							</div>
							<div>
								<i className='fa-solid fa-user'></i> Profile
							</div>
						</div>
					) : (
						""
					)}
				</div>
			</div>
		</div>
	);
};

export default Header;