import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'react-icons-kit';
import { enter, github, home3 } from 'react-icons-kit/icomoon';
import './style.scss';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
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
	      </div>
	    </div>
	  );
	}
}

export default Header;
