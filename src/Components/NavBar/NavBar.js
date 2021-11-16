import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './NavBar.scss';

class NavBar extends Component {
	render() {
		return (
			<nav>
				<Link to='/'>Pocetna</Link>
				<Link to='/zaposlena-lica'>Zaposleni</Link>
				<Link to='/neradni-dani'>Neradni dani</Link>
				<Link to='/godisnji-odmori'>Godisnji odmori</Link>
				<Link to='/login'>Login</Link>
			</nav>
		);
	}
}

export default NavBar;
