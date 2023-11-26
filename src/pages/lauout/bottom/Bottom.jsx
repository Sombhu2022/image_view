import './bottom.scss';
import { Link } from 'react-router-dom';

const Bottom = () => {
  return (
    <div className='bottom'>
			<div>
				<Link to={"/"}>
					Photos <i className="fa-regular fa-image"></i>
				</Link>
			</div>
			<div>
				<Link  to={"/"}>
					Texts <i className="fa-solid fa-envelope-open-text"></i>
				</Link>
				
			</div>
		</div>
  )
}

export default Bottom