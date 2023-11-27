import './bottom.scss';
import { Link } from 'react-router-dom';

const Bottom = ({toggleView}) => {
  return (
    <div className='bottom'>
			<div onClick={()=>toggleView('p')}>
				<Link to={"/"}>
					Photos <i className="fa-regular fa-image"></i>
				</Link>
			</div>
			<div onClick={()=>toggleView('t')}>
				<Link  to={"/"}>
					Texts <i className="fa-solid fa-envelope-open-text"></i>
				</Link>
				
			</div>
		</div>
  )
}

export default Bottom