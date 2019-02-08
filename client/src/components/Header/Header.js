import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'react-icons-kit';
import { enter, github, home3, user } from 'react-icons-kit/icomoon';
import './style.scss';

class Header extends React.Component {
	render() {
	  return (
	    <div className="header">
	      <div className="nav-bar">
		      <a className="nav-link" href="https://github.com/gluaxspeed">
		      	<Icon icon={github} />
		      </a>
	        <Link className="nav-link" to="/">
	        	<Icon icon={home3} />
	        </Link>
	        <Link className="nav-link" to="/login">
	        	<Icon icon={enter} />
	        </Link>
	        <Link className="nav-link" to="/user">
	        	<Icon icon={user} />
	        </Link>
	      </div>
	    </div>
	  );
	}
}

export default Header;
