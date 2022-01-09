import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './NavBar.scss';

class NavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mobNavVisible: false
		};
		this.showNavigationMob = this.showNavigationMob.bind(this);
	}

	showNavigationMob(show) {
		this.setState({mobNavVisible: show})
	}

	render() {
		return (
			<div>
				<div className="mobile-menu">
					<span>
						<svg
							onClick={() => this.showNavigationMob(true)}
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24">
							<path d="M3.5 7a.5.5 0 0 1 0-1h17a.5.5 0 1 1 0 1h-17Zm0 5a.5.5 0 1 1 0-1h17a.5.5 0 1 1 0 1h-17Zm0 5a.5.5 0 1 1 0-1h17a.5.5 0 1 1 0 1h-17Z"/>
						</svg>
					</span>
				</div>
				<nav className={this.state.mobNavVisible ? 'visible-nav' : null}>
					<span onClick={() => this.showNavigationMob(false)}>X</span>
					<Link to='/'
						  onClick={() => this.showNavigationMob(false)}>Pocetna</Link>
					<Link to='/zaposlena-lica'
						  onClick={() => this.showNavigationMob(false)}>Zaposleni</Link>
					<Link to='/godisnji-odmori'
						  onClick={() => this.showNavigationMob(false)}>Godisnji odmori</Link>
					{
						this.props.user.role === 'ROLE_ADMIN' ?
							<Link to='/register'
								  onClick={() => this.showNavigationMob(false)}>Novozaposleni</Link> :
							null
					}
					{
						this.props.user.firstName ?
							<Link to='/moj-profil'
								  onClick={() => this.showNavigationMob(false)}>
								{this.props.user.firstName + ' ' + this.props.user.lastName}
							</Link> :
							<Link to='/login'
								  onClick={() => this.showNavigationMob(false)}>Login</Link>
					}
				</nav>
			</div>
		);
	}
}

export default NavBar;
